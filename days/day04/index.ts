// https://adventofcode.com/2025/day/4
// Day 4: Printing Department

import { buildMap2d, type Tile } from '../../common/map-builder.ts';

export function dayRunner(input: string) {
  const banks = input.split('\n').map((row) => row.split(''));

  const map = buildMap2d(banks);

  function countAdjacent(tile: Tile): number {
    let count = 0;

    if (tile.up?.left?.value === '@') count += 1;
    if (tile.up?.value === '@') count += 1;
    if (tile.up?.right?.value === '@') count += 1;
    if (tile.left?.value === '@') count += 1;
    if (tile.right?.value === '@') count += 1;
    if (tile.down?.left?.value === '@') count += 1;
    if (tile.down?.value === '@') count += 1;
    if (tile.down?.right?.value === '@') count += 1;

    return count;
  }

  let part01 = 0;
  for (const [_, bank] of map) {
    if (bank.value !== '@') continue;

    const adjacent = countAdjacent(bank);
    if (adjacent < 4) part01 += 1;
  }

  let part02 = 0;
  let removed = 0;
  do {
    removed = 0;
    const toRemove: Tile[] = [];

    for (const [_, bank] of map) {
      if (bank.value !== '@') continue;

      const adjacent = countAdjacent(bank);
      if (adjacent < 4) {
        toRemove.push(bank);
        part02 += 1;
        removed += 1;
      }
    }
    for (const removedTile of toRemove) {
      removedTile.value = '.';
    }
  } while (removed > 0);

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${part02}\n`);
}
