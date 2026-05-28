use vms_sync::{App, AppFocus, SyncArgs, TuiStage};

#[test]
fn test_focus_toggle() {
    let mut app = App::new(SyncArgs::default());
    assert_eq!(app.focus, AppFocus::Main);

    app.toggle_focus();
    assert_eq!(app.focus, AppFocus::Sidebar);

    app.toggle_focus();
    assert_eq!(app.focus, AppFocus::Main);
}

#[test]
fn test_set_stage() {
    let mut app = App::new(SyncArgs::default());
    assert_eq!(app.stage, TuiStage::Welcome);

    app.set_stage(TuiStage::Agents);
    assert_eq!(app.stage, TuiStage::Agents);
    assert_eq!(app.list_state.selected(), Some(0));
}

#[test]
fn test_state_persistence_across_stages() {
    let mut app = App::new(SyncArgs::default());
    app.sync_args.force = true;
    app.credentials.atlassian_username = "test@opswat.com".to_string();

    app.set_stage(TuiStage::Agents);
    assert_eq!(app.sync_args.force, true);
    assert_eq!(app.credentials.atlassian_username, "test@opswat.com");

    app.set_stage(TuiStage::Credentials);
    assert_eq!(app.sync_args.force, true);
    assert_eq!(app.credentials.atlassian_username, "test@opswat.com");
}
