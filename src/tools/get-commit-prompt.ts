import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';

import { getPromptContent } from '@utils/prompt-reader.js';
import { MCP_TEXT_CONTENT_TYPE } from '@constants/index.js';

const GET_COMMIT_PROMPT_TOOL_NAME = 'get_commit_message_prompt';

export function defineGetCommitPromptTool(server: McpServer) {
  server.tool(GET_COMMIT_PROMPT_TOOL_NAME, {}, async () => {
    try {
      const promptContent = await getPromptContent();
      return {
        content: [
          {
            type: MCP_TEXT_CONTENT_TYPE,
            text: promptContent,
          },
        ],
      };
    } catch (error: any) {
      console.error(
        `Error in defineGetCommitPromptTool: ${error.message}`,
        error,
      );
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get commit prompt content: ${error.message}`,
      );
    }
  });
}
