// https://adventofcode.com/2025/day/5
// Day 5: Cafeteria

export function dayRunner(input: string) {
  const [ingredientListRaw, listRaw] = input.split('\n\n');
  const ingredientsRanges = ingredientListRaw.split('\n').map((row) => row.split('-').map(Number));
  const ingredientList = listRaw.split('\n').map(Number);

  let part01 = 0;
  for (const ingredient of ingredientList) {
    const isFresh = ingredientsRanges.some(([from, to]) => ingredient >= from && ingredient <= to);

    if (isFresh) part01 += 1;
  }

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${2}\n`);
}
