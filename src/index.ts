#!/usr/bin/env node

/**
 * This MCP server provides the standard Git commit message prompt as a resource.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the URI for the commit prompt resource
const COMMIT_PROMPT_URI = 'prompt://git/commit-message/standard/v1';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // This will be .../commit-prompt-server/build when running the compiled code

// Calculate the project root directory by going up one level from the build directory
const projectRoot = path.join(__dirname, '..');

// Define the path to the prompt file relative to the project root, inside the src directory
const PROMPT_FILE_PATH = path.join(
  projectRoot,
  'src', // Look inside the src directory
  'prompts',
  'commit_message_v1.txt',
);

/**
 * Create an MCP server that only exposes the commit prompt resource.
 */
const server = new Server(
  {
    name: 'commit-prompt-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      resources: {}, // We only need resource capability
      // tools: {}, // Not needed for this server
      // prompts: {}, // Not needed for this server
    },
  },
);

/**
 * Handler for listing available resources.
 * Exposes the single commit prompt resource.
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: COMMIT_PROMPT_URI,
        mimeType: 'text/plain',
        name: 'Standard Git Commit Message Prompt',
        description:
          'The standard prompt template for generating Git commit messages.',
      },
    ],
  };
});

/**
 * Handler for reading the contents of the commit prompt resource.
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri !== COMMIT_PROMPT_URI) {
    // Use ErrorCode.InvalidRequest as a fallback if NotFound/ResourceNotFound are not available
    throw new McpError(
      ErrorCode.InvalidRequest, // Changed from NotFound
      `Resource not found or invalid URI: ${request.params.uri}`,
    );
  }

  try {
    const promptContent = await fs.readFile(PROMPT_FILE_PATH, 'utf-8');
    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: 'text/plain',
          text: promptContent,
        },
      ],
    };
  } catch (error) {
    console.error(`Error reading prompt file: ${PROMPT_FILE_PATH}`, error);
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to read commit prompt file.`,
    );
  }
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
