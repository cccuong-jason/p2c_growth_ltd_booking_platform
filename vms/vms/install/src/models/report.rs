use crate::models::agent::Agent;
use crate::models::tui::WriteStatus;
use std::collections::BTreeMap;

#[derive(Default, Debug)]
pub struct InstallReport {
    pub skills: BTreeMap<Agent, Vec<(String, WriteStatus)>>,
    pub instructions: BTreeMap<Agent, WriteStatus>,
    pub orchestration: BTreeMap<Agent, Vec<(String, WriteStatus)>>,
    pub orchestration_runtime: Vec<(String, WriteStatus)>,
    pub mcps: BTreeMap<Agent, WriteStatus>,
    pub pr_template: Option<WriteStatus>,
}
