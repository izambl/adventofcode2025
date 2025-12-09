// https://adventofcode.com/2025/day/8
// Day 8: Playground

interface Box {
  x: number;
  y: number;
  z: number;
  connectionsTo: Set<Box>;
  key: string;
}

function pointKey(x: string, y: string, z: string): string {
  return `${x}|${y}|${z}`;
}

function getDistance(pointA: Box, pointB: Box): number {
  return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2 + (pointA.z - pointB.z) ** 2);
}

export function dayRunner(input: string) {
  const junctionBoxes = new Map<string, Box>();

  input.split('\n').forEach((line) => {
    const [x, y, z] = line.split(',');
    const boxKey = pointKey(x, y, z);
    const box: Box = { x: Number(x), y: Number(y), z: Number(z), connectionsTo: new Set<Box>(), key: boxKey };
    box.connectionsTo.add(box);
    junctionBoxes.set(boxKey, box);
  });

  const distances: Record<string, number> = {};
  for (const [keyFrom, jbFrom] of junctionBoxes) {
    for (const [keyTo, jbTo] of junctionBoxes) {
      if (jbFrom === jbTo) continue;

      const distanceKey = [keyFrom, keyTo].sort().join('-');

      if (distances[distanceKey]) continue;

      const distance = getDistance(jbFrom, jbTo);

      distances[distanceKey] = distance;
    }
  }

  const sortedDistances = Object.keys(distances).sort((a, b) => distances[a] - distances[b]);

  let rounds = 0;
  const boxesInCircuits: Set<Box> = new Set();
  let part01 = 0;
  let part02 = 0;

  for (const shortestDistance of sortedDistances) {
    rounds += 1;
    const [keyA, keyB] = shortestDistance.split('-');
    const boxA = junctionBoxes.get(keyA);
    const boxB = junctionBoxes.get(keyB);

    if (!boxA || !boxB) throw new Error('Boxes cannot be undefined');

    // Are them in same circuit?
    if (boxA.connectionsTo.has(boxB)) {
      console.log(boxA.key, 'and', boxB.key, 'are in the same circuit');
      continue;
    }

    console.log('Connecting', boxA.key, 'and', boxB.key);
    const allConnections = [...boxA.connectionsTo, ...boxB.connectionsTo];

    // Creates connections between all boxes in the same circuit
    for (const connection of allConnections) {
      for (const connectionToAdd of allConnections) {
        connection.connectionsTo.add(connectionToAdd);
      }
    }

    // If box A is connected to all junction boxes it means everything is connected
    if (boxA.connectionsTo.size === junctionBoxes.size) {
      console.log('Success Baby', keyA, keyB);
      part02 = boxA.x * boxB.x;
      break;
    }

    boxesInCircuits.add(boxA);
    boxesInCircuits.add(boxB);

    if (rounds === 1000) {
      const circuits: Record<string, number> = {};
      for (const circuitBox of boxesInCircuits) {
        // Get a key to identify different circuits
        const circuitKey = [...circuitBox.connectionsTo]
          .map((box) => box.key)
          .sort()
          .join('--');

        circuits[circuitKey] = circuitBox.connectionsTo.size;
      }

      const sortedLengths = Object.values(circuits).sort((a, b) => b - a);
      part01 = sortedLengths[0] * sortedLengths[1] * sortedLengths[2];
    }
  }

  process.stdout.write(`Part 01: ${part01}\n`);
  process.stdout.write(`Part 02: ${part02}\n`);
}
