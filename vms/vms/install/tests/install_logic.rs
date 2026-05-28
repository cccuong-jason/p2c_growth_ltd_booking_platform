use std::fs;
use std::path::PathBuf;
use std::process::Command;
use std::time::{SystemTime, UNIX_EPOCH};
use vms_sync::{Component, Role, SyncArgs, parse_components, workflow_plan};

#[test]
fn components_all_expands_to_everything() {
    let components = parse_components("all").unwrap();
    // parse_components still returns BTreeSet as it might be used internally
    assert_eq!(components.len(), 4);
}

#[test]
fn workflow_without_required_values_enters_tui() {
    let sync = SyncArgs {
        agents: vec![],
        role: Some(Role::Frontend),
        components: vec![Component::Skills],
        force: false,
    };
    assert!(workflow_plan(&sync).requires_tui);
}

#[test]
fn orchestration_without_agent_selection_enters_tui() {
    let sync = SyncArgs {
        agents: vec![],
        role: Some(Role::Frontend),
        components: vec![Component::Orchestration],
        force: false,
    };
    assert!(workflow_plan(&sync).requires_tui);
}

#[test]
fn install_script_persists_cargo_bin_for_future_zsh_sessions() {
    let repo_root = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let temp_root = unique_temp_dir("vms-sync-install-test");
    let home_dir = temp_root.join("home");
    let fake_bin = temp_root.join("fake-bin");

    fs::create_dir_all(home_dir.join(".cargo/bin")).unwrap();
    fs::create_dir_all(&fake_bin).unwrap();

    fs::write(home_dir.join(".zshrc"), "# existing rc\n").unwrap();
    fs::write(
        home_dir.join(".cargo/env"),
        "export PATH=\"$HOME/.cargo/bin:$PATH\"\n",
    )
    .unwrap();
    write_executable(
        fake_bin.join("cargo"),
        r#"#!/usr/bin/env bash
set -euo pipefail
if [[ "${1:-}" == "install" && "${2:-}" == "--path" ]]; then
  mkdir -p "${HOME}/.cargo/bin"
  cat > "${HOME}/.cargo/bin/vms-sync" <<'EOF'
#!/usr/bin/env bash
echo "vms-sync test binary"
EOF
  chmod +x "${HOME}/.cargo/bin/vms-sync"
  exit 0
fi
echo "unexpected cargo invocation: $*" >&2
exit 1
"#,
    );

    let path = format!("{}:/usr/bin:/bin", fake_bin.display());
    let output = Command::new("bash")
        .arg("install.sh")
        .current_dir(&repo_root)
        .env_clear()
        .env("HOME", &home_dir)
        .env("PATH", &path)
        .env("SHELL", "/usr/bin/zsh")
        .output()
        .unwrap();

    assert!(
        output.status.success(),
        "install.sh failed: stdout={}\nstderr={}",
        String::from_utf8_lossy(&output.stdout),
        String::from_utf8_lossy(&output.stderr)
    );

    let zshrc = fs::read_to_string(home_dir.join(".zshrc")).unwrap();
    assert!(zshrc.contains("vms-sync installer PATH setup"));
    assert_eq!(zshrc.matches("vms-sync installer PATH setup").count(), 1);

    let fresh_shell = Command::new("zsh")
        .args(["-ic", "command -v vms-sync"])
        .env_clear()
        .env("HOME", &home_dir)
        .env("ZDOTDIR", &home_dir)
        .env("PATH", "/usr/bin:/bin")
        .output()
        .unwrap();

    assert!(
        fresh_shell.status.success(),
        "fresh zsh could not resolve vms-sync: stdout={}\nstderr={}",
        String::from_utf8_lossy(&fresh_shell.stdout),
        String::from_utf8_lossy(&fresh_shell.stderr)
    );
    assert_eq!(
        String::from_utf8_lossy(&fresh_shell.stdout).trim(),
        home_dir.join(".cargo/bin/vms-sync").display().to_string()
    );
}

#[test]
fn install_script_places_wrapper_in_existing_path_dir_for_immediate_use() {
    let repo_root = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let temp_root = unique_temp_dir("vms-sync-install-immediate");
    let home_dir = temp_root.join("home");
    let fake_bin = temp_root.join("fake-bin");
    let local_bin = home_dir.join(".local/bin");

    fs::create_dir_all(home_dir.join(".cargo/bin")).unwrap();
    fs::create_dir_all(&fake_bin).unwrap();
    fs::create_dir_all(&local_bin).unwrap();

    fs::write(home_dir.join(".bashrc"), "# existing rc\n").unwrap();
    fs::write(
        home_dir.join(".cargo/env"),
        "export PATH=\"$HOME/.cargo/bin:$PATH\"\n",
    )
    .unwrap();
    write_executable(
        fake_bin.join("cargo"),
        r#"#!/usr/bin/env bash
set -euo pipefail
if [[ "${1:-}" == "install" && "${2:-}" == "--path" ]]; then
  mkdir -p "${HOME}/.cargo/bin"
  cat > "${HOME}/.cargo/bin/vms-sync" <<'EOF'
#!/usr/bin/env bash
echo "vms-sync test binary"
EOF
  chmod +x "${HOME}/.cargo/bin/vms-sync"
  exit 0
fi
echo "unexpected cargo invocation: $*" >&2
exit 1
"#,
    );

    let path = format!(
        "{}:{}:/usr/bin:/bin",
        fake_bin.display(),
        local_bin.display()
    );
    let output = Command::new("bash")
        .arg("install.sh")
        .current_dir(&repo_root)
        .env_clear()
        .env("HOME", &home_dir)
        .env("PATH", &path)
        .env("SHELL", "/usr/bin/bash")
        .output()
        .unwrap();

    assert!(
        output.status.success(),
        "install.sh failed: stdout={}\nstderr={}",
        String::from_utf8_lossy(&output.stdout),
        String::from_utf8_lossy(&output.stderr)
    );

    let wrapper_path = local_bin.join("vms-sync");
    assert!(
        wrapper_path.exists(),
        "expected wrapper at {}",
        wrapper_path.display()
    );

    let same_path_shell = Command::new("bash")
        .args(["-lc", "command -v vms-sync"])
        .env_clear()
        .env("HOME", &home_dir)
        .env("PATH", format!("{}:/usr/bin:/bin", local_bin.display()))
        .output()
        .unwrap();

    assert!(
        same_path_shell.status.success(),
        "same PATH shell could not resolve vms-sync: stdout={}\nstderr={}",
        String::from_utf8_lossy(&same_path_shell.stdout),
        String::from_utf8_lossy(&same_path_shell.stderr)
    );
    assert_eq!(
        String::from_utf8_lossy(&same_path_shell.stdout).trim(),
        wrapper_path.display().to_string()
    );
}

#[test]
fn unix_installer_rejects_windows_like_ostype() {
    let repo_root = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let temp_root = unique_temp_dir("vms-sync-install-ostype");
    let home_dir = temp_root.join("home");

    fs::create_dir_all(&home_dir).unwrap();

    let output = Command::new("bash")
        .arg("install.sh")
        .current_dir(&repo_root)
        .env_clear()
        .env("HOME", &home_dir)
        .env("PATH", "/usr/bin:/bin")
        .env("SHELL", "/usr/bin/bash")
        .env("OSTYPE", "msys")
        .output()
        .unwrap();

    assert!(!output.status.success());
    assert!(
        String::from_utf8_lossy(&output.stderr).contains("install.ps1"),
        "stderr was: {}",
        String::from_utf8_lossy(&output.stderr)
    );
}

#[test]
fn windows_installer_contains_path_persistence_and_verification() {
    let script =
        fs::read_to_string(PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("install.ps1")).unwrap();

    assert!(script.contains("SetEnvironmentVariable("));
    assert!(script.contains("powershell"));
    assert!(script.contains("Get-Command vms-sync"));
    assert!(script.contains("rustup"));
}

fn unique_temp_dir(prefix: &str) -> PathBuf {
    let nanos = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_nanos();
    let dir = std::env::temp_dir().join(format!("{prefix}-{nanos}"));
    fs::create_dir_all(&dir).unwrap();
    dir
}

fn write_executable(path: PathBuf, content: &str) {
    fs::write(&path, content).unwrap();
    let metadata = fs::metadata(&path).unwrap();
    let mut perms = metadata.permissions();
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        perms.set_mode(0o755);
        fs::set_permissions(&path, perms).unwrap();
    }
}
