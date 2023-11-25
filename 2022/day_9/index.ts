import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((line) => line !== '');

class TailPositionsStore {
  positions = new Set<string>();

  addPosition(position: string) {
    return this.positions.add(position);
  }

  getPositionsCount() {
    return Array.from(this.positions).length;
  }
}

// Store tail positions to count
const store = new TailPositionsStore();

type Coords = [number, number];

type DirToVector = {
  R: Coords;
  L: Coords;
  U: Coords;
  D: Coords;
};

const dirToVector: DirToVector = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1],
};

function isTailMoving(headCoords: Coords, tailCoords: Coords) {
  let [diffX, diffY] = [
    Math.abs(headCoords[0] - tailCoords[0]),
    Math.abs(headCoords[1] - tailCoords[1]),
  ];

  return diffX <= 1 && diffY <= 1;
}

// Use vectors to know position of Head and Tail
// If Head and Tail have a gap => Tail moves to last Head position
// In this case, add vector position of Tail to Set
function getTailPositionsCount(arr: string[]) {
  let headCoords: Coords = [0, 0];
  let tailCoords: Coords = [0, 0];

  arr.forEach((line) => {
    const direction = line.split(' ')[0] as keyof DirToVector;
    const steps = +direction.split(' ')[1];

    const directionVector = dirToVector[direction];

    for (let i = 0; i < steps; i++) {
      if (isTailMoving(headCoords, tailCoords)) {
        headCoords = [
          headCoords[0] + directionVector[0],
          headCoords[1] + directionVector[1],
        ];
      } else {
      }
    }

    console.log(direction, steps);
  });

  return store.getPositionsCount();
}

console.log(getTailPositionsCount(lines));
