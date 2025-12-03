// https://adventofcode.com/2025/day/3
// Day 3: Lobby

export function dayRunner(input: string) {
  const banks = input.split('\n');

  function findLargest(batteries: string, startIndex: number = 0): [number, number] {
    let maxValue = -Infinity;
    let maxIndex = 0;

    for (let i = startIndex; i < batteries.length; i++) {
      if (Number(batteries[i]) > maxValue) {
        maxIndex = i;
        maxValue = Number(batteries[i]);
      }
    }

    return [maxIndex, maxValue];
  }

  let part01 = 0;
  for (const bank of banks) {
    const [firstIndex, firstValue] = findLargest(bank.substring(0, bank.length - 1));
    const [_, secondValue] = findLargest(bank, firstIndex + 1);

    part01 += Number(`${firstValue}${secondValue}`);
  }

  let part02 = 0;
  const batteryCount = 12;
  for (const bank of banks) {
    const batteries: number[] = [];
    let currentIndex = 0;

    for (let battery = 1; battery <= batteryCount; battery++) {
      const [batteryIndex, batteryValue] = findLargest(
        bank.substring(0, bank.length - (batteryCount - battery)),
        currentIndex,
      );
      batteries.push(batteryValue);
      currentIndex = batteryIndex + 1;
    }
    part02 += Number(batteries.join(''));
  }

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${part02}\n`);
}
