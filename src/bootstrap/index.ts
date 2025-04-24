import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { defineCommitPromptResource } from '@resources/index.js';
import { defineGetCommitPromptTool } from '@tools/index.js';
import { SERVER_NAME, SERVER_VERSION } from '@constants/index.js';

export async function startServer() {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION!,
  });

  defineCommitPromptResource(server);
  defineGetCommitPromptTool(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
