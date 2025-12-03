// https://adventofcode.com/2025/day/1
// Day 1: Secret Entrance

export function dayRunner(input: string) {
  const instructions = input.split('\n');

  let position = 50;
  let hits = 0;
  for (const instruction of instructions) {
    const direction = instruction[0];
    const clicks = Number(instruction.substring(1));

    if (direction === 'R') {
      position += clicks;
    } else {
      position -= clicks;
    }

    if (position === 0) {
      hits++;
    } else if (Math.abs(position) % 100 === 0) {
      hits++;
    }
  }

  let position2 = 50;
  let hits2 = 0;
  for (const instruction of instructions) {
    const direction = instruction[0];
    const clicks = Number(instruction.substring(1));

    for (let i = 0; i < clicks; i++) {
      if (direction === 'R') {
        position2 += 1;
        if (position2 === 100) {
          position2 = 0;
        }
      } else {
        position2 -= 1;
        if (position2 === -1) {
          position2 = 99;
        }
      }
      if (position2 === 0) {
        hits2 += 1;
      }
    }
  }

  process.stdout.write(`Part 01: ${hits}\n`);
  process.stdout.write(`Part 02: ${hits2}\n`);
}
