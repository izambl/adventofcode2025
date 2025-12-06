// https://adventofcode.com/2025/day/6
// Day 6: Trash Compactor

export function dayRunner(input: string) {
  const operationsP1 = input.split('\n').map((row) => row.replaceAll(/ +/g, ' ').trim().split(' '));
  const operationsP2 = input.split('\n').map((row) => row.split(''));

  let part01 = 0;
  while (operationsP1[0].length > 0) {
    const operation = [];
    for (const line of operationsP1) {
      operation.push(line.shift());
    }

    const operator = operation.pop();

    part01 += operation.reduce(
      (acc, num) => {
        return operator === '+' ? Number(num) + acc : Number(num) * acc;
      },
      operator === '+' ? 0 : 1,
    );
  }

  // PART 02
  const toProcess: Array<{ operator: string; nums: number[] }> = [];

  let currentOp: { operator: string; nums: number[] } = { operator: '', nums: [] };
  toProcess.push(currentOp);

  let isFirst = true;
  while (operationsP2[0].length > 0) {
    const numberArray = [];

    let number = 0;

    for (const row of operationsP2) {
      numberArray.push(row.shift());
    }
    if (numberArray.every((op) => op === ' ')) {
      currentOp = { operator: '', nums: [] };
      toProcess.push(currentOp);
      isFirst = true;
      continue;
    }

    if (isFirst) {
      currentOp.operator = numberArray.pop() ?? '';
      isFirst = false;
    }
    number = Number(numberArray.join(''));

    currentOp.nums.push(number);
  }
  console.log(toProcess);

  const part2 = toProcess.reduce((acc, ops) => {
    acc += ops.nums.reduce(
      (acc, num) => {
        return ops.operator === '+' ? num + acc : num * acc;
      },
      ops.operator === '+' ? 0 : 1,
    );
    return acc;
  }, 0);

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${part2}\n`);
}
