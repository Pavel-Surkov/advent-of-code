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

type Coords = {
  x: number;
  y: number;
};

type DirToVector = {
  R: Coords;
  L: Coords;
  U: Coords;
  D: Coords;
};

// X  axis L -> R
// Y axis U -> D
const dirToVector: DirToVector = {
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
};

function isTailMoving(headCoords: Coords, tailCoords: Coords) {
  const [diffX, diffY] = [
    Math.abs(headCoords.x - tailCoords.x),
    Math.abs(headCoords.y - tailCoords.y),
  ];

  return diffX > 1 || diffY > 1;
}

function getTailPositionsCount(linesArr: string[]) {
  let headCoords: Coords = { x: 0, y: 0 };
  let tailCoords: Coords = { x: 0, y: 0 };

  store.addPosition(`${tailCoords.x}_${tailCoords.y}`);

  linesArr.forEach((line) => {
    const direction = line.split(' ')[0] as keyof DirToVector;
    const steps = +line.split(' ')[1];

    const directionVector = dirToVector[direction];

    for (let step = 0; step < +steps; step++) {
      const previousHeadCoords = Object.assign({}, headCoords);

      headCoords.x = headCoords.x + directionVector.x;
      headCoords.y = headCoords.y + directionVector.y;

      if (isTailMoving(headCoords, tailCoords)) {
        tailCoords.x = previousHeadCoords.x;
        tailCoords.y = previousHeadCoords.y;

        store.addPosition(`${tailCoords.x}_${tailCoords.y}`);
      }
    }
  });

  return store.getPositionsCount();
}

// Part one
console.log(getTailPositionsCount(lines));
