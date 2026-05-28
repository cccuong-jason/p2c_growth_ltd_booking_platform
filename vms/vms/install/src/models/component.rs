#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord, clap::ValueEnum)]
pub enum Component {
    Skills,
    Mcps,
    PrTemplate,
    Orchestration,
    All,
}

impl Component {
    pub fn cli_name(self) -> &'static str {
        match self {
            Self::Skills => "skills",
            Self::Mcps => "mcps",
            Self::PrTemplate => "pr-template",
            Self::Orchestration => "orchestration",
            Self::All => "all",
        }
    }
}
