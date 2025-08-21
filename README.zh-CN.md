# MCP Server AGENTS.md

![](https://badge.mcpx.dev?type=server 'MCP Server')
[![npm Version](https://img.shields.io/npm/v/mcp-server-agents-md.svg)](https://www.npmjs.com/package/mcp-server-agents-md)
[![npm License](https://img.shields.io/npm/l/mcp-server-agents-md.svg)](https://www.npmjs.com/package/mcp-server-agents-md)

用于管理代理定义 Markdown 文件（规则、工作流、子代理、claude.md、cursorrule、windsurfrule 等）的统一 MCP 服务器。一处编写，处处可用。

> [!NOTE]
> [AGENTS.md](https://agents.md/) 由 OpenAI 发布。

## 概述

`mcp-server-agents-md` 是一个轻量级 MCP 服务器，它将你所有以 Markdown 编写的代理定义文件集中管理。它让你可以在 Claude、Cursor、Windsurf 等不同的代码代理平台之间，轻松共享与复用规则、工作流、子代理，以及其他代理规范。

- 通过 MCP 提供**基于 Markdown 的代理定义**
- 轻松集成到任何兼容 MCP 的代理环境

## 特性

> [!TIP]
> 为了帮助 LLM 更快识别工具调用命令，我们设计了一个触发命令（`cc:`, carbon copy to agent），类似于其其它产品中的 `/` 与 `@`。例如，要触发生成 git 提交信息的代理工作流，你可以输入 `cc:commit`。可以存在多个触发命令，定义在每个[代理的 `markdown` 文件](src/agents)的 `frontMatter.trigger` 字段中。

代理（工作流/规则）：

- [`commit,git-commit`](src/agents/commit.md) - 使用规范化提交信息与表情符号创建格式良好的提交。
- [`fast-commit,fast-git-commit`](src/agents/commit-fast.md) - 基于已暂存的变更生成 3 条提交信息建议。
- [`issue-report,analyze-issue`](src/agents/analyze-issue.md) - 获取 GitHub issue 详情并创建完整的实现规格说明。
- [`bugfix,code-bugfix`](src/agents/bug-fix.md) - 将缺陷修复从 issue 创建到拉取请求进行流程化。
- [`clean,code-clean`](src/agents/clean.md) - 修复整个代码库中的所有代码格式与质量问题。
- [`check,code-check`](src/agents/check.md) - 执行全面的代码质量与安全检查。
- [`code-analysis,code-report`](src/agents/code-analysis.md) - 提供多种检查选项的高级代码分析。
- [`create-docs`](src/agents/create-docs.md) - 为指定组件或功能创建完整文档。
- [`update-docs`](src/agents/update-docs.md) - 基于具体文件引用生成面向 LLM 优化的文档，并支持灵活格式。
- [`changelog,add-to-changelog,update-changelog`](src/agents/add-to-changelog.md) - 为项目的 CHANGELOG.md 文件添加新条目。
- [`task,implement-task`](src/agents/implement-task.md) - 以有条理的方法进行任务实现，包括周密规划与执行。
- [`mermaid,create-mermaid`](src/agents/mermaid.md) - 生成用于可视化代码结构与关系的 Mermaid 图表。

> 代理、工作流、规则来源：
>
> - [Agent Rules](https://github.com/steipete/agent-rules)

## 使用方法

在 Claude、VSCode、Cursor、Windsurf、Cline、Cherry Studio、Chatbox 等 AI 客户端中使用时，添加以下 MCP 服务器配置。

在 macOS 上：

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

在 Windows 上：

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

接下来，你需要在客户端中选择支持工具调用（Tools Call/Function Call）的 AI 模型，并输入简单的提示，例如：

- `git commit` - 自然语言请求
- `调用工具生成提交信息` - 显式工具请求
- `cc:commit` - 触发命令，推荐
- `cc:fast-commit` - 触发命令，推荐

## 开发

安装依赖：

```bash
npm install
```

构建服务器：

```bash
npm run build
```

启动 MCP 服务器：

```bash
npm run start
```

## 发布

版本发布使用 [standard-version](https://github.com/conventional-changelog/standard-version) 工具。

```bash
npm run release
# 或以预发布版本发布
npm run release -- --prerelease alpha
```

## 许可证

[MIT](LICENSE)
