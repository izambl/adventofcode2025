// https://adventofcode.com/2025/day/1
// Day 1: Secret Entrance

import path from 'node:path';

import { readInput } from '../../common/index';

const part01Input = readInput(path.join(__dirname, 'input01'), '\n');

let position = 50;
let hits = 0;
for (const instruction of part01Input) {
  const direction = instruction[0];
  const clicks = Number(instruction.substring(1));

  if (direction === 'R') {
    position += clicks;
  } else {
    position -= clicks;
  }

  console.log(position);

  if (position === 0) {
    hits++;
  } else if (Math.abs(position) % 100 === 0) {
    hits++;
  }
}

process.stdout.write(`Part 01: ${hits}\n`);
process.stdout.write(`Part 02: ${1}\n`);
