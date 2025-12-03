import fs from 'node:fs';
import path from 'node:path';

const day = process.argv[2];
const inputFile = process.argv[3] ?? 'inputTest';

if (!day) {
  console.error('Please specify a day');
  process.exit(1);
}
const dayDir = `./day${day}`;
const input = fs.readFileSync(path.join(import.meta.dirname, dayDir, inputFile)).toString('utf-8');

const { dayRunner } = await import(`${dayDir}/index.ts`);

dayRunner(input);
