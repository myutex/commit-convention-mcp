import { defineConfig } from 'tsup';
import fs from 'fs-extra';
import path from 'path';
import { OUTPUT_DIR, SOURCE_DIR_NAME, PROMPTS_DIR_NAME } from './src/constants';

const ENTRY_POINT = 'src/index.ts';
const OUTPUT_FORMAT = 'esm';
const NODE_TARGET = 'node16';

const LOG_BUILD_START_COPY = 'Build successful, copying prompts...';
const LOG_COPY_SUCCESS = 'Prompts copied successfully!';
const LOG_COPY_FAILURE = 'Failed to copy prompts:';

export default defineConfig({
  entry: [ENTRY_POINT],
  format: [OUTPUT_FORMAT],
  target: NODE_TARGET,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  treeshake: true,
  outDir: OUTPUT_DIR,
  shims: true,
  minify: false,
  async onSuccess() {
    console.log(LOG_BUILD_START_COPY);
    const sourceDir = path.resolve(
      process.cwd(),
      SOURCE_DIR_NAME,
      PROMPTS_DIR_NAME,
    );
    const destDir = path.resolve(process.cwd(), OUTPUT_DIR, PROMPTS_DIR_NAME);

    try {
      if (!(await fs.pathExists(sourceDir))) {
        console.error(`Source directory not found: ${sourceDir}`);
        return;
      }

      await fs.ensureDir(destDir);

      console.log(`Copying from ${sourceDir} to ${destDir}`);
      await fs.copy(sourceDir, destDir);

      if (await fs.pathExists(path.join(destDir, 'convention.md'))) {
        console.log(`Verified: convention.md exists in ${destDir}`);
        console.log(LOG_COPY_SUCCESS);
      } else {
        console.error(
          `Warning: convention.md not found in destination after copy.`,
        );
      }
    } catch (err) {
      console.error(LOG_COPY_FAILURE, err);
    }
  },
});
