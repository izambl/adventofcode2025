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

  function tryMerge(range: number[], ranges: Array<[number, number]>, skipIndex: number): boolean {
    console.log('try merging', range, 'into', ranges, skipIndex);
    for (let i = 0; i < ranges.length; i++) {
      if (i === skipIndex) continue;

      let merged = false;

      const [f, t] = ranges[i];
      const [from, to] = range;

      if ((from >= f && from <= t) || (to >= f && to <= t)) {
        if (to > t) {
          ranges[i][1] = to;
        }
        if (from < f) {
          ranges[i][0] = from;
        }
        merged = true;
      }

      if (merged) {
        console.log('Merging with', ranges[i]);
        return true;
      }
    }

    return false;
  }

  let mergeExecuted = false;
  const part02Ranges = JSON.parse(JSON.stringify(ingredientsRanges));
  do {
    mergeExecuted = false;
    for (let i = 0; i < part02Ranges.length; i++) {
      const range = part02Ranges[i];
      mergeExecuted = tryMerge(range, part02Ranges, i);

      if (mergeExecuted) {
        part02Ranges.splice(i, 1);
        console.log('merged', part02Ranges);
        break;
      }
    }
  } while (mergeExecuted);

  console.log(part02Ranges);

  let part02 = 0;
  for (const [from, to] of part02Ranges) {
    part02 += Math.abs(to - from);
    part02 += 1;
  }

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${part02}\n`);
}
