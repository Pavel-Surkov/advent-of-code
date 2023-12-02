import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((line) => line !== '');

type CubesCount = {
  red: number;
  green: number;
  blue: number;
};

const maxPossibleCubesCount: CubesCount = {
  red: 12,
  green: 13,
  blue: 14,
};

type Game = {
  id: number;
  maxCubesCount: CubesCount;
};

// Part one
function getGamesData(lines: string[]): Game[] {
  return lines.map((line) => {
    const id = Number(line.split(/\:|;/).shift()?.split(' ')[1]);
    const maxCubesCount: CubesCount = line
      .split(/\:|;/)
      .slice(1)
      .reduce(
        (maxCounts, set) => {
          const splitted = set.trim().split(', ');

          const newMaxCounts = maxCounts;

          splitted.forEach((str) => {
            const [count, color] = str.split(' ');

            if (newMaxCounts[color] < +count) {
              newMaxCounts[color] = +count;
            }
          });

          return newMaxCounts;
        },
        { red: 0, green: 0, blue: 0 }
      );

    if (isNaN(id)) {
      console.error('id is NaN');
    }

    return {
      id,
      maxCubesCount,
    };
  });
}

const games = getGamesData(lines);

function calculatePossibleGamesIds(games: Game[]) {
  return games.reduce((sumGameIds, currentGame) => {
    const maxCubesCount = currentGame.maxCubesCount;

    for (let color in maxCubesCount) {
      if (maxCubesCount[color] > maxPossibleCubesCount[color]) {
        return sumGameIds;
      }
    }

    return sumGameIds + currentGame.id;
  }, 0);
}

console.log(calculatePossibleGamesIds(games));

// Part two
