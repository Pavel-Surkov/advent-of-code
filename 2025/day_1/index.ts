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

// Нужно проверить вообще пересекает циферблат ли точку нуля при вращении
// Далее если пересекает, то разделить число pointsCount на maxPoint и получить число оборотов циферблата
function createSafeCrackerV2(startPoint: number) {
  let zerosCounter = 0;

  lines.reduce((currentPoint, instr) => {
    const direction = instr[0] as 'L' | 'R';
    const pointsCount = +instr.slice(1);

    const nextPointsNotNormalized =
      currentPoint + DirectionToMultiplyer[direction] * pointsCount;

    let nextPoint = nextPointsNotNormalized % 100;

    while (nextPoint < 0) {
      nextPoint = nextPoint + 100;
    }

    if (
      nextPointsNotNormalized > 99 ||
      (nextPointsNotNormalized < 0 && currentPoint !== 0)
    ) {
      const dialFullRotationsCount = Math.floor(
        Math.abs(nextPointsNotNormalized / 100)
      );

      zerosCounter = zerosCounter + dialFullRotationsCount;

      // Если от -99 до 0 то dialFullRotationsCount === 0, а нужно добавлять 1
      if (nextPointsNotNormalized > -100 && nextPointsNotNormalized < 0) {
        zerosCounter++;
      }
    } else if (nextPoint === 0) {
      zerosCounter++;
    }

    return nextPoint;
  }, startPoint);

  return zerosCounter;
}

const resultZerosCountV2 = createSafeCrackerV2(50);
console.log(`Part two answer: ${resultZerosCountV2}`);
// Неверно (5913)
