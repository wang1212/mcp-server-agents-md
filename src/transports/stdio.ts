import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

export async function startStdioServer(server: Server) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
