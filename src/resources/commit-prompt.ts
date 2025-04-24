import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { URL } from 'url';

import { getPromptContent } from '@utils/prompt-reader.js';
import {
  COMMIT_PROMPT_RESOURCE_NAME,
  PLAIN_TEXT_MIME_TYPE,
} from '@constants/index.js';

const COMMIT_PROMPT_URI = 'prompt://git/commit-message/standard/v1';

export function defineCommitPromptResource(server: McpServer) {
  server.resource(
    COMMIT_PROMPT_RESOURCE_NAME,
    COMMIT_PROMPT_URI,
    async (uri: URL) => {
      try {
        const promptContent = await getPromptContent();
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: PLAIN_TEXT_MIME_TYPE,
              text: promptContent,
            },
          ],
        };
      } catch (error: any) {
        console.error(
          `Error in defineCommitPromptResource: ${error.message}`,
          error,
        );
        throw new McpError(
          ErrorCode.InternalError,
          `Failed to get commit prompt content: ${error.message}`,
        );
      }
    },
  );
}
