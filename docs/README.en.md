# Commit Message Convention MCP: Write Accurate Commit Messages Easily with AI

**Tired of looking up commit message rules every time? Now, easily and consistently write messages conforming to Conventional Commits rules with your AI assistant!**

This MCP (Model Context Protocol) server provides a **commit message guideline (prompt template)** so that your AI assistant (e.g., Claude) can understand standardized commit conventions and effectively help you write commit messages. Create a clean and meaningful commit history with the help of AI!

**✨ Why Use This Server?**

- **No More Guessing Commit Messages:** Your AI assistant accurately understands Conventional Commits rules and helps you write messages. Maintain consistency without memorizing the rules.
- **Save Time & Increase Productivity:** Reduce the time spent searching for commit rules and complete commit messages faster with AI assistance, allowing you to focus on development.
- **Clean Git History:** Well-organized commit logs make project management and collaboration much easier.
- **First Step Towards Automation:** Standardized commit messages form the basis for various development automations, such as automatic Changelog generation.

## 🤖 What Can Your AI Assistant Do With This Server?

Your AI assistant can leverage the features provided by this server to help you in the following ways:

1.  **Real-time Reference to Commit Rules:**
    - The AI instantly checks and applies the **[Conventional Commits](https://www.conventionalcommits.org/) guidelines** via the `prompt://git/commit-message/standard/v1` address. It ensures you write messages conforming to the rules or follows the correct format when drafting messages for you.
2.  **View Full Guideline Text:**
    - If you ask, "Show me the full commit guideline," the AI uses the `get_commit_message_prompt` tool to retrieve and display the **entire text** of the guideline. Useful when you want to check the content directly.

## 🚀 How to Use (Setup in 1 Minute with npx!)

Get started easily with a single `npx` command, no separate installation required!

1.  **Add Server to AI Assistant Configuration:**
    Add the following code to the MCP server configuration of your AI assistant (e.g., Claude Desktop, VSCode extension, etc.).

    ```json
    {
      "inputs": [],
      "servers": {
        "commit-convention-mcp": {
          "type": "stdio",
          "command": "npx",
          "args": ["-y", "commit-convention-mcp@latest"]
        }
      }
      // ... other server configurations might exist ...
    }
    ```

    **Key Configuration:**

    - Set `command: "npx"` and `args: ["-y", "commit-convention-mcp"]` to run the server via `npx`. (The `-y` skips the confirmation step).
    - (Tip) To always use the latest version, change `args` to `["-y", "commit-convention-mcp@latest"]`.

    **Note:** The exact location of the configuration file and its overall structure may vary depending on your AI assistant environment (Claude Desktop, VSCode, etc.). Refer to the documentation for your specific environment to find the `servers` or similar configuration section and add or merge the code above.

2.  **Restart AI Assistant:**
    Save the configuration and restart your AI assistant (or editor). The setup is complete!

## ✨ How to Leverage with Your AI Assistant

You can now ask your AI assistant the following to make writing commit messages easier and more accurate.

**Example 1: Checking the Commit Rule Guidelines**

> "Tell me about the Conventional Commits rules. (Use the commit-convention-mcp server)"

The AI assistant will present the accurate guidelines and template obtained through this server.

**Example 2: Requesting a Draft Commit Message (Depends on AI Assistant Capabilities)**

> "Draft a commit message in Conventional Commits format based on my changes. (Reference the commit-convention-mcp server)"

The AI assistant can suggest an appropriate commit message draft based on the server's guidelines, helping you save time and reduce errors.

## 📜 License

This project is distributed under the [MIT License](./LICENSE). Feel free to use and contribute!

## 🤝 Contributing and Reporting Issues

Suggestions for improvement or bug reports are always welcome! Please feel free to let us know via [GitHub Issues](https://github.com/sk0x0y/commit-convention-mcp/issues).

---

## 🧑‍💻 Information for Developers

The following information is for those who want to modify this MCP server directly or contribute to its development.

### Local Development Setup

You can develop and test the server in your local environment.

- **Install Dependencies:**
  ```bash
  npm install
  ```
- **Build:**
  ```bash
  npm run build
  ```
- **Development Mode (Auto-Rebuild):**
  ```bash
  npm run watch
  ```
  Automatically rebuilds the server upon file changes.

## Debugging

Since MCP servers communicate over standard input/output (stdio), direct debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) for debugging.

You can run the Inspector using the script included in the project:

```bash
npm run inspector
```

The Inspector provides a web-based interface that helps in checking and debugging MCP messages. Access it via the URL displayed in the terminal upon execution.
