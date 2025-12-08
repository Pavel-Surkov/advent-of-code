import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((line) => line !== '');

const DirectionToMultiplyer = {
  L: -1,
  R: 1,
};

// Part one
function createSafeCracker(maxPoint: number, startPoint: number) {
  let zerosCounter = 0;

  lines.reduce((currentPoint, instr) => {
    const direction = instr[0] as 'L' | 'R';
    const pointsCount = +instr.slice(1);

    const nextPointsNotNormalized =
      currentPoint + DirectionToMultiplyer[direction] * pointsCount;

    const nextPoint = nextPointsNotNormalized % (maxPoint + 1);

    if (nextPoint === 0) {
      zerosCounter++;
    }

    return nextPoint;
  }, startPoint);

  return zerosCounter;
}

const resultZerosCount = createSafeCracker(99, 50);
console.log(`Part one answer: ${resultZerosCount}`); // 1147

// Part two
function createSafeCrackerV3(startPoint: number) {
  let zerosCounter = 0;

  lines.reduce((currentPoint, instr) => {
    const direction = instr[0] as 'L' | 'R';
    const pointsCount = +instr.slice(1);

    let nextPoint = currentPoint;

    for (let i = 0; i < pointsCount; i++) {
      if (direction === 'L') {
        nextPoint = nextPoint - 1;
      } else if (direction === 'R') {
        nextPoint = nextPoint + 1;
      }

      if (nextPoint > 99) {
        nextPoint = 0;
      } else if (nextPoint < 0) {
        nextPoint = 99;
      }

      if (nextPoint === 0) {
        zerosCounter++;
      }
    }

    return nextPoint;
  }, startPoint);

  return zerosCounter;
}

const resultZerosCountV3 = createSafeCrackerV3(50);
console.log(`Part two answer: ${resultZerosCountV3}`); // 6789
