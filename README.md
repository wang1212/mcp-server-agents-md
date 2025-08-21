# MCP Server AGENTS.md

![](https://badge.mcpx.dev?type=server 'MCP Server')
[![npm Version](https://img.shields.io/npm/v/mcp-server-agents-md.svg)](https://www.npmjs.com/package/mcp-server-agents-md)
[![npm License](https://img.shields.io/npm/l/mcp-server-agents-md.svg)](https://www.npmjs.com/package/mcp-server-agents-md)

A unified MCP server for managing agent definition Markdown files (rules, workflows, subagents, claude.md, cursorrule, windsurfrule, etc.). Write once, use everywhere.

> [!NOTE]
> [AGENTS.md](https://agents.md/) published by OpenAI.

## Overview

`mcp-server-agents-md` is a lightweight MCP server that centralizes all your agent definition files in Markdown format. It allows you to easily share and reuse rules, workflows, subagents, and other agent specs across different code agent platforms like Claude, Cursor, Windsurf, and more.

- Serve **Markdown-based agent definitions** via MCP.
- Easy integration with any MCP-compliant agent environment.

## Features

> [!TIP]
> To help LLMs more quickly identify tool invocation commands, we've designed a trigger command (`cc:`, carbon copy to agent), similar to `/` and `@` in other products. For example, to trigger an agent workflow that generates a git commit message, you can write `cc:commit` . Multiple trigger commands can exist, defined in the `frontMatter.trigger` field of each [agent's `markdown` file](src/agents).

Agents (workflows/rules):

- [`commit,git-commit`](src/agents/commit.md) - Create well-formatted commits with conventional commit messages and emojis.
- [`fast-commit,fast-git-commit`](src/agents/commit-fast.md) - Generate 3 commit message suggestions based on the staged changes.
- [`issue-report,analyze-issue`](src/agents/analyze-issue.md) - Fetch GitHub issue details and create a comprehensive implementation specification.
- [`bugfix,code-bugfix`](src/agents/bug-fix.md) - Streamline bug fixing workflow from issue creation to pull request.
- [`clean,code-clean`](src/agents/clean.md) - Fix all code formatting and quality issues in the entire codebase.
- [`check,code-check`](src/agents/check.md) - Perform comprehensive code quality and security checks.
- [`code-analysis,code-report`](src/agents/code-analysis.md) - Perform advanced code analysis with multiple inspection options.
- [`create-docs`](src/agents/create-docs.md) - Create comprehensive documentation for specified components or features.
- [`update-docs`](src/agents/update-docs.md) - Generate LLM-optimized documentation with concrete file references and flexible formatting.
- [`changelog,add-to-changelog,update-changelog`](src/agents/add-to-changelog.md) - Update the project's CHANGELOG.md file with a new entry.
- [`task,implement-task`](src/agents/implement-task.md) - Approach task implementation methodically with careful planning and execution.
- [`mermaid,create-mermaid`](src/agents/mermaid.md) - Generate Mermaid diagrams for visualizing code structure and relationships.

> Agents, workflows, rules source:
>
> - [Agent Rules](https://github.com/steipete/agent-rules)

## Usage

To use with AI client apps such as Claude, VSCode, Cursor, Windsurf, Cline, Cherry Studio, Chatbox, etc., add the MCP server configuration below.

On Mac system:

```json
{
  "mcpServers": {
    "Agents": {
      "command": "npx",
      "args": [
        "--registry=https://registry.npmjs.org/",
        "-y",
        "mcp-server-agents-md@latest"
      ]
    }
  }
}
```

On Windows system:

```json
{
  "mcpServers": {
    "Agents": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "--registry=https://registry.npmjs.org/",
        "-y",
        "mcp-server-agents-md@latest"
      ]
    }
  }
}
```

Next, you need to select an AI model that supports tool calling (Tools Call/Function Call) in your client application and enter simple prompts, such as:

- `git commit` - Natural language request
- `Call the tool to generate commit information` - Explicit tool request
- `cc:commit` - Trigger command, recommended
- `cc:fast-commit` - Trigger command, recommended

## Development

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

Start the MCP server:

```bash
npm run start
```

## Publish

Version releases use the [standard-version](https://github.com/conventional-changelog/standard-version) tool.

```bash
npm run release
# or Release as a Pre-Release
npm run release -- --prerelease alpha
```

## License

[MIT](LICENSE)
