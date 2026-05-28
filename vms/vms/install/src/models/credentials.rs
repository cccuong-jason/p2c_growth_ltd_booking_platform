use crate::models::mcp::Mcp;
use std::collections::BTreeSet;

#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub struct Credentials {
    pub atlassian_username: String,
    pub atlassian_token: String,
    pub figma_token: String,
    pub dbhub_key: String,
    pub dbhub_dsn: String,
    pub skipped: BTreeSet<Mcp>,
}
