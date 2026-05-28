#[test]
fn codex_guide_uses_native_remote_url() {
    let guide = include_str!("../for-codex.md");
    assert!(guide.contains("\"url\": \"https://mcp.atlassian.com/v1/sse\""));
    assert!(
        !guide.contains("\"args\": [\"-y\", \"mcp-remote\", \"https://mcp.atlassian.com/v1/sse\"]")
    );
    assert!(!guide.contains("@anthropic-labs/mcp-atlassian"));
    assert!(!guide.contains("ATLASSIAN_USERNAME"));
    assert!(!guide.contains("ATLASSIAN_API_TOKEN"));
}

#[test]
fn cursor_guide_uses_native_remote_url() {
    let guide = include_str!("../for-cursor.md");
    assert!(guide.contains("\"url\": \"https://mcp.atlassian.com/v1/sse\""));
    assert!(
        !guide.contains("\"args\": [\"-y\", \"mcp-remote\", \"https://mcp.atlassian.com/v1/sse\"]")
    );
    assert!(!guide.contains("@anthropic-labs/mcp-atlassian"));
    assert!(!guide.contains("ATLASSIAN_USERNAME"));
    assert!(!guide.contains("ATLASSIAN_API_TOKEN"));
}

#[test]
fn other_agent_guides_keep_remote_bridge_setup() {
    for guide in [
        include_str!("../for-claude-code.md"),
        include_str!("../for-copilot.md"),
        include_str!("../for-gemini.md"),
    ] {
        assert!(
            guide.contains(
                "\"args\": [\"-y\", \"mcp-remote\", \"https://mcp.atlassian.com/v1/sse\"]"
            )
        );
        assert!(!guide.contains("@anthropic-labs/mcp-atlassian"));
        assert!(!guide.contains("ATLASSIAN_USERNAME"));
        assert!(!guide.contains("ATLASSIAN_API_TOKEN"));
    }
}
