#!/usr/bin/env bash
set -euo pipefail

REPO="opswat-eng/ai-playbook"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CARGO_HOME_DIR="${CARGO_HOME:-${HOME}/.cargo}"
CARGO_BIN_DIR="${CARGO_HOME_DIR}/bin"

detect_unix_os() {
  local uname_out
  uname_out="$(uname -s 2>/dev/null || echo unknown)"
  case "${OSTYPE:-}" in
    msys*|cygwin*|win32*) echo "windows" ; return 0 ;;
  esac
  case "${uname_out}" in
    Darwin) echo "macos" ;;
    Linux) echo "linux" ;;
    MINGW*|MSYS*|CYGWIN*) echo "windows" ;;
    *) echo "unknown" ;;
  esac
}

require_supported_unix_os() {
  local os_name
  os_name="$(detect_unix_os)"
  case "${os_name}" in
    macos|linux) return 0 ;;
    windows)
      echo "Error: Windows detected. Run install.ps1 from PowerShell instead of install.sh." >&2
      exit 1
      ;;
    *)
      echo "Error: Unsupported operating system for install.sh: ${os_name}. Supported: macOS and Linux." >&2
      exit 1
      ;;
  esac
}

ensure_cargo_bin_in_path() {
  export PATH="${CARGO_BIN_DIR}:${PATH}"

  if [[ -f "${CARGO_HOME_DIR}/env" ]]; then
    # shellcheck disable=SC1090
    source "${CARGO_HOME_DIR}/env"
  fi
}

shell_rc_file() {
  local shell_name
  shell_name="$(basename "${SHELL:-}")"
  case "${shell_name}" in
    zsh) echo "${HOME}/.zshrc" ;;
    bash) echo "${HOME}/.bashrc" ;;
    *) echo "${HOME}/.profile" ;;
  esac
}

persist_cargo_bin_for_future_shells() {
  local rc_file
  rc_file="$(shell_rc_file)"
  mkdir -p "$(dirname "${rc_file}")"
  touch "${rc_file}"

  if ! grep -Fq "vms-sync installer PATH setup" "${rc_file}"; then
    cat >> "${rc_file}" <<EOF

# vms-sync installer PATH setup
export PATH="${CARGO_BIN_DIR}:\$PATH"
EOF
  fi
}

find_immediate_command_dir() {
  local candidate

  for candidate in "${HOME}/.local/bin" "${HOME}/bin"; do
    if [[ ":${PATH}:" == *":${candidate}:"* ]]; then
      mkdir -p "${candidate}"
      if [[ -w "${candidate}" ]]; then
        printf '%s\n' "${candidate}"
        return 0
      fi
    fi
  done

  IFS=':' read -r -a path_entries <<< "${PATH}"
  for candidate in "${path_entries[@]}"; do
    [[ -n "${candidate}" ]] || continue
    [[ "${candidate}" == "${CARGO_BIN_DIR}" ]] && continue
    if [[ -d "${candidate}" && -w "${candidate}" ]]; then
      printf '%s\n' "${candidate}"
      return 0
    fi
  done

  return 1
}

install_immediate_command_shim() {
  local command_dir shim_path
  command_dir="$(find_immediate_command_dir || true)"
  [[ -n "${command_dir}" ]] || return 0

  shim_path="${command_dir}/vms-sync"
  rm -f "${shim_path}"

  if ln -s "${CARGO_BIN_DIR}/vms-sync" "${shim_path}" 2>/dev/null; then
    return 0
  fi

  cat > "${shim_path}" <<EOF
#!/usr/bin/env bash
exec "${CARGO_BIN_DIR}/vms-sync" "\$@"
EOF
  chmod +x "${shim_path}"
}

verify_vms_sync_available() {
  local shell_name verify_output
  shell_name="$(basename "${SHELL:-}")"
  if command -v "${shell_name}" >/dev/null 2>&1; then
    verify_output="$("${shell_name}" -ic 'command -v vms-sync' 2>/dev/null || true)"
    if [[ -n "${verify_output}" ]]; then
      return 0
    fi
  fi

  command -v vms-sync >/dev/null 2>&1
}

if ! command -v cargo >/dev/null 2>&1; then
  require_supported_unix_os
  echo "Rust/Cargo is not installed. Automatically installing via rustup..."
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

  ensure_cargo_bin_in_path

  if ! command -v cargo >/dev/null 2>&1; then
    echo "Error: Failed to install or configure Rust automatically. Please install it manually from https://rustup.rs/" >&2
    exit 1
  fi
fi

require_supported_unix_os
ensure_cargo_bin_in_path

# If we are inside the repository, install from the local path
if [[ -f "${SCRIPT_DIR}/Cargo.toml" ]]; then
    echo "Installing vms-sync globally from local path..."
    cargo install --path "${SCRIPT_DIR}"
    install_immediate_command_shim
    persist_cargo_bin_for_future_shells
    if ! verify_vms_sync_available; then
      echo "Error: vms-sync was installed but is not available on PATH in a fresh ${SHELL:-shell} session." >&2
      exit 1
    fi
    echo ""
    echo "✅ vms-sync successfully installed to your Cargo bin directory!"
    echo "You can now run 'vms-sync' from anywhere in your terminal."
    exit 0
fi

# If curl'd, clone to a temporary directory and install
if ! command -v gh >/dev/null 2>&1; then
  echo "Error: 'gh' CLI not found. Install from https://cli.github.com/ and authenticate to continue." >&2
  exit 1
fi

tmp_dir="$(mktemp -d)"
trap 'rm -rf "${tmp_dir}"' EXIT

echo "Cloning ${REPO} to a temporary directory to install vms-sync..."
gh repo clone "${REPO}" "${tmp_dir}" -- --depth 1

echo "Installing vms-sync globally..."
cargo install --path "${tmp_dir}/teams-to-share/vms/install"
install_immediate_command_shim
persist_cargo_bin_for_future_shells
if ! verify_vms_sync_available; then
  echo "Error: vms-sync was installed but is not available on PATH in a fresh ${SHELL:-shell} session." >&2
  exit 1
fi

echo ""
echo "✅ vms-sync successfully installed to your Cargo bin directory!"
echo "You can now run 'vms-sync' from anywhere in your terminal."
