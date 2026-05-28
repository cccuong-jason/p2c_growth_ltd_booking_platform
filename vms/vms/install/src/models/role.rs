use crate::models::mcp::Mcp;

#[derive(Clone, Copy, Debug, PartialEq, Eq, clap::ValueEnum)]
pub enum Role {
    Backend,
    Frontend,
    Fullstack,
    DataEngineer,
    SecurityEngineer,
    DevOps,
    SoftwareInTest,
}

impl Role {
    pub fn parse(input: &str) -> Result<Self, String> {
        match input {
            "backend" => Ok(Self::Backend),
            "frontend" => Ok(Self::Frontend),
            "fullstack" => Ok(Self::Fullstack),
            "data-engineer" => Ok(Self::DataEngineer),
            "security-engineer" => Ok(Self::SecurityEngineer),
            "devops" => Ok(Self::DevOps),
            "software-in-test" => Ok(Self::SoftwareInTest),
            other => Err(format!("Invalid role '{other}'")),
        }
    }

    pub fn cli_name(self) -> &'static str {
        match self {
            Self::Backend => "backend",
            Self::Frontend => "frontend",
            Self::Fullstack => "fullstack",
            Self::DataEngineer => "data-engineer",
            Self::SecurityEngineer => "security-engineer",
            Self::DevOps => "devops",
            Self::SoftwareInTest => "software-in-test",
        }
    }

    pub fn mcps(self) -> &'static [Mcp] {
        match self {
            Self::Backend => &[Mcp::Atlassian, Mcp::Dbhub],
            Self::Frontend => &[Mcp::Atlassian, Mcp::Figma, Mcp::Chrome],
            Self::Fullstack => &[Mcp::Atlassian, Mcp::Figma, Mcp::Chrome, Mcp::Dbhub],
            _ => &[], // Coming soon roles have no MCPs yet
        }
    }
}
