import { spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'activity-report-'));
try {
  const outputFile = path.join(tempDir, 'index.html');
  const cacheFile = path.join(tempDir, 'activity-data.json');

  const result = spawnSync(
    process.execPath,
    [
      path.join(process.cwd(), 'generate-rich-report.mjs'),
      '--paths',
      process.cwd(),
      '--hours',
      '1',
      '--no-prs',
      '--output-file',
      outputFile,
      '--cache-file',
      cacheFile,
    ],
    { stdio: 'inherit' }
  );

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

