#!/usr/bin/env node

import { startServer } from '@bootstrap/index.js';
import { EXIT_CODE_FAILURE } from '@constants/index.js';

startServer().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(EXIT_CODE_FAILURE);
});
