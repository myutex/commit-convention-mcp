import { promises as fs } from 'fs';
import path from 'path';

import {
  PROMPTS_DIR_NAME,
  PROMPT_FILE_NAME,
  FILE_ENCODING,
  OUTPUT_DIR,
  SOURCE_DIR_NAME,
} from '@constants/index.js';

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function getPromptContent(): Promise<string> {
  const projectRoot = path.resolve(__dirname, '..');

  const promptFilePath = path.join(PROMPTS_DIR_NAME, PROMPT_FILE_NAME);

  const distPath = path.join(projectRoot, OUTPUT_DIR, promptFilePath);

  const srcPath = path.join(projectRoot, SOURCE_DIR_NAME, promptFilePath);

  try {
    if (await fileExists(distPath)) {
      const content = await fs.readFile(distPath, FILE_ENCODING);
      return content;
    }

    if (await fileExists(srcPath)) {
      const content = await fs.readFile(srcPath, FILE_ENCODING);
      return content;
    }

    throw new Error('Prompt file not found in any location');
  } catch (error: any) {
    const errorMsg = `Failed to read commit prompt file: ${error.message}`;
    throw new Error(errorMsg);
  }
}
