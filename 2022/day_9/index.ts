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

type DirToPos = {
  R: Coords;
  L: Coords;
  U: Coords;
  D: Coords;
};

// axis [x, y]
const dirToPos: DirToPos = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1],
};

const backCases = {
  L: 'R',
  R: 'L',
  U: 'D',
  D: 'U',
};

function getTailPositionsCount(arr: string[]) {
  // axis [x, y]
  let currentTailCoords: Coords = [0, 0];

  // Set initial coordinates
  store.addPosition(currentTailCoords.join('_'));

  function move(steps: number, notMoveSteps: number, pos: [number, number]) {
    // TODO: solve problem: With this function Tail always has position left or right from Head: TH, HT
    // There different cases: HT, H covers T, H  , etc.
    // 																					T
    for (let i = 0 + notMoveSteps; i < steps; i++) {
      if (i > notMoveSteps) {
        return;
      }

      const position: Coords = [
        currentTailCoords[0] + pos[0],
        currentTailCoords[1] + pos[1],
      ];

      currentTailCoords = position;

      store.addPosition(position.join('_'));
    }
  }

  arr.reduce((previousLine, line, index) => {
    const [previousDirection, previousSteps] = previousLine.split(' ');
    const [direction, steps] = line.split(' ');

    const pos = dirToPos[direction];

    // Case for the first iteration (previousSteps === 0)
    if (index === 0) {
      const notMoveSteps = 1;
      move(+steps, notMoveSteps, pos);

      return line;
    }

    // TODO:
    // Special case, H could possibly go around T so T won't move
    // Maybe just re-calculate currentTailCoords without pushing to the store
    if (+previousSteps === 1) {
      return line;
    }

    // TODO: Calculate notMoveSteps for other cases (always > 0)
    // For 'Back' case notMoveSteps = 2
    // For 'Left' or 'Right' cases notMoveSteps = 1

    // 'Back' case with 2 or more steps
    if (backCases[previousDirection] === direction) {
      const notMoveSteps = 2;
      move(+steps, notMoveSteps, pos);

      return line;
    }

    // Other usual cases
    const notMoveSteps = 1;
    move(+steps, notMoveSteps, pos);

    return line;
  }, 'R 0');

  return store.getPositionsCount();
}
// Maybe handle cases wher there are 1 or 2 steps as special case: find a differend solurion

console.log(getTailPositionsCount(lines));
