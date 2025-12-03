// https://adventofcode.com/2025/day/2
// Day 2: Gift Shop

export function dayRunner(input: string) {
  const rangeInput = input.split(',').map((idRange) => idRange.split('-').map(Number));

  const invalidIdsPart01 = [];
  for (const range of rangeInput) {
    const [from, to] = range;

    for (let id = from; id <= to; id++) {
      const idString = String(id);
      const left = idString.substring(0, idString.length / 2);
      const right = idString.substring(idString.length / 2);

      if (left === right) {
        invalidIdsPart01.push(id);
      }
    }
  }

  const invalidIdsPart02 = [];
  for (const range of rangeInput) {
    const [from, to] = range;

    for (let id = from; id <= to; id++) {
      const idString = String(id);
      const steps = idString.length / 2;

      for (let len = 1; len <= steps; len++) {
        const part = idString.substring(0, len);
        const partId = part.repeat(idString.length / len);

        if (partId === idString) {
          invalidIdsPart02.push(id);
          break;
        }
      }
    }
  }

  const part01 = invalidIdsPart01.reduce((a, b) => a + b, 0);
  const part02 = invalidIdsPart02.reduce((a, b) => a + b, 0);

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${part02}\n`);
}
