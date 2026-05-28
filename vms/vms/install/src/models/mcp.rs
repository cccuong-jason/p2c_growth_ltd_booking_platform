#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum Mcp {
    Atlassian,
    Figma,
    Chrome,
    Dbhub,
}

impl Mcp {
    pub fn cli_name(self) -> &'static str {
        match self {
            Self::Atlassian => "atlassian",
            Self::Figma => "figma",
            Self::Chrome => "chrome",
            Self::Dbhub => "dbhub",
        }
    }
}
