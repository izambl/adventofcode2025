// https://adventofcode.com/2025/day/7
// Day 7: Laboratories

import { buildMap2d, P, printMap, type Tile } from '../../common/map-builder.ts';

export function dayRunner(input: string) {
  const diagramRaw = input.split('\n').map((row) => row.split(''));

  const diagram = buildMap2d(diagramRaw);
  let startPoint: Tile | undefined;
  for (const [_, tile] of diagram) {
    if (tile.value === 'S') {
      startPoint = tile;
      break;
    }
  }

  // PART 01
  let part01 = 0;
  function navigateFrom(tile: Tile, usedSplitters: Set<Tile>) {
    const nextTile = tile.down;
    if (!nextTile) {
      return;
    }
    if (nextTile.value === '^') {
      if (usedSplitters.has(nextTile)) return;
      usedSplitters.add(nextTile);
      nextTile.left && navigateFrom(nextTile.left, usedSplitters);
      nextTile.right && navigateFrom(nextTile.right, usedSplitters);
      part01 += 1;
      return;
    }
    navigateFrom(nextTile, usedSplitters);
  }
  startPoint && navigateFrom(startPoint, new Set<Tile>());

  // PART 02
  /**
   * Instead of following all paths, start from the bottom and calculate the splits in every division point
   * then move one level up at a time and each time a division point is fount we follow left and right paths
   * down until we encounter null or another division point. Then we sum the value of the division point splits
   * or 1 in case of not finding any.
   * Doing that till the first division point will result in the total timelines.
   */

  let lowestLevel = 0;
  for (const [_, tile] of diagram) {
    if (tile.position[1] > lowestLevel) lowestLevel = tile.position[1];
  }

  function walkSplit(tile: Tile): number {
    let leftLane: Tile | null = tile.left;
    while (leftLane !== null && leftLane.value !== '^') leftLane = leftLane.down;

    let rightLane: Tile | null = tile.right;
    while (rightLane !== null && rightLane.value !== '^') rightLane = rightLane.down;

    const leftValue = leftLane ? Number(leftLane.carryValue) : 1;
    const rightValue = rightLane ? Number(rightLane.carryValue) : 1;

    return leftValue + rightValue;
  }

  let firstSplit: Tile | null = null;
  for (let currentLevel = lowestLevel; currentLevel >= 0; currentLevel--) {
    let currentTile: Tile | null = diagram.get(P(0, currentLevel)) ?? null;

    while (currentTile) {
      if (currentTile.value === '^') {
        firstSplit = currentTile;
        currentTile.carryValue = walkSplit(currentTile);
      }

      currentTile = currentTile.right;
    }
  }

  const part02 = Number(firstSplit?.carryValue);

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${part02}\n`);
}
