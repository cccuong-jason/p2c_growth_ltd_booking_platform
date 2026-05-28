use vms_sync::{Agent, AppCommand, Component, Role, SyncArgs, parse_args};

#[test]
fn update_subcommand_maps_to_forceful_sync_shape() {
    let parsed = parse_args(["vms-sync", "update", "--components", "all"]).unwrap();
    assert_eq!(
        parsed,
        AppCommand::Update(SyncArgs {
            agents: vec![],
            role: None,
            components: vec![
                Component::Skills,
                Component::Mcps,
                Component::PrTemplate,
                Component::Orchestration,
            ],
            force: true, // update command sets force to true
        })
    );
}

#[test]
fn invalid_role_returns_existing_error_shape() {
    let err = parse_args(["vms-sync", "sync", "--role", "qa"]).unwrap_err();
    assert!(err.to_string().contains("invalid value 'qa'"));
}

#[test]
fn default_sync_can_be_fully_prefilled() {
    let parsed = parse_args([
        "vms-sync",
        "--agent",
        "codex",
        "--role",
        "backend",
        "--components",
        "mcps",
    ])
    .unwrap();

    assert_eq!(
        parsed,
        AppCommand::Sync(SyncArgs {
            agents: vec![Agent::Codex],
            role: Some(Role::Backend),
            components: vec![Component::Mcps],
            force: false,
        })
    );
}
