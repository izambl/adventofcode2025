// https://adventofcode.com/2025/day/9
// Day 9: Movie Theater

export function dayRunner(input: string) {
  const coords = input.split('\n').map((row) => row.split(',').map(Number));

  let maxX = -Infinity;
  let maxY = -Infinity;

  let part01 = 0;
  for (const [Ax, Ay] of coords) {
    if (Ax > maxX) maxX = Ax;
    if (Ay > maxY) maxY = Ay;

    for (const [Bx, By] of coords) {
      const area = (Math.abs(Ax - Bx) + 1) * (Math.abs(Ay - By) + 1);
      if (area > part01) part01 = area;
    }
  }

  // PART 02
  const coordsMapX: Record<number, [number, number]> = {};
  const coordsMapY: Record<number, [number, number]> = {};

  for (const [Ax, Ay] of coords) {
    const Bx = coords.find(([x, y]) => y === Ay && x !== Ax)?.[0] ?? 0;
    const By = coords.find(([x, y]) => x === Ax && y !== Ay)?.[1] ?? 0;

    const fromX = Math.min(Ax, Bx);
    const toX = Math.max(Ax, Bx);
    coordsMapY[Ay] = [fromX, toX];

    const fromY = Math.min(Ay, By);
    const toY = Math.max(Ay, By);
    coordsMapX[Ax] = [fromY, toY];
  }

  const part2 = 0;
  for (const [Ax, Ay] of coords) {
    for (const [Bx, By] of coords) {
      const minX = Math.min(Ax, Bx);
      const maxX = Math.max(Ax, Bx);
      const minY = Math.min(Ay, By);
      const maxY = Math.max(Ay, By);

      // Get the corners of the rectangle
      const topLeft = [minX, minY];
      const topRight = [maxX, minY];
      const bottomLeft = [minX, maxY];
      const bottomRight = [maxX, maxY];

      // If all corners are in a border, we have a valid rectangle

      const area = (Math.abs(Ax - Bx) + 1) * (Math.abs(Ay - By) + 1);
      if (area > part01) part01 = area;
    }
  }

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${2}\n`);
}
