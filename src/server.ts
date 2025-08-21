import process from 'node:process';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
  CallToolResult,
} from '@modelcontextprotocol/sdk/types.js';
import { startStdioServer } from './transports';
import { agentTools } from './tools';

export class MapGenerationServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'agents-md-server',
        version: '0.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    this.setupToolHandlers();

    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    // https://modelcontextprotocol.io/specification/2025-03-26/server/tools#listing-tools
    // https://github.com/modelcontextprotocol/typescript-sdk/blob/1.11.4/src/server/mcp.ts#L107
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: Object.values(agentTools).map((item) => item.tool),
    }));

    // https://modelcontextprotocol.io/specification/2025-03-26/server/tools#calling-tools
    // https://github.com/modelcontextprotocol/typescript-sdk/blob/1.11.4/src/server/mcp.ts#L138
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const tool = agentTools[request.params.name];
      if (!tool) {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}.`,
        );
      }

      try {
        const args = request.params.arguments as { userInput: string };

        // Return the agent content and metadata as the tool result
        const result: CallToolResult = {
          content: [
            {
              type: 'text',
              text: `Complete the tasks given by the user according to the following plan.\n<instructions>${tool.prompt}</instructions>\n<user_input>${args.userInput}</user_input>`,
            },
          ],
        };

        // https://modelcontextprotocol.io/specification/2025-03-26/server/tools#tool-result
        return result;
      } catch (error: unknown) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Failed to response: ${(error as Error)?.message || 'Unknown error.'}`,
            },
          ],
        };
      }
    });
  }

  async runStdio() {
    await startStdioServer(this.server);
  }
}
