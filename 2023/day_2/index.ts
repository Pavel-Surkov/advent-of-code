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
  cubesCounts: CubesCount[];
};

// Part one
function getGamesData(lines: string[]): Game[] {
  return lines.map((line) => {
    const id = Number(line.split(/\:|;/).shift()?.split(' ')[1]);
    const cubesCounts: CubesCount[] = line
      .split(/\:|;/)
      .slice(1)
      .reduce((countsArr: CubesCount[], set) => {
        const splitted = set.trim().split(', ');

        const newCounts: CubesCount = {
          red: 0,
          green: 0,
          blue: 0,
        };

        splitted.forEach((str) => {
          const [count, color] = str.split(' ');

          if (newCounts[color] < +count) {
            newCounts[color] = +count;
          }
        });

        return [...countsArr, newCounts];
      }, []);

    if (isNaN(id)) {
      console.error('id is NaN');
    }

    return {
      id,
      cubesCounts,
    };
  });
}

const games = getGamesData(lines);

function calculatePossibleGamesIds(games: Game[]) {
  return games.reduce((sumGameIds, currentGame) => {
    const cubesCounts = currentGame.cubesCounts;

    for (let cubesCount of cubesCounts) {
      for (let color in cubesCount) {
        if (cubesCount[color] > maxPossibleCubesCount[color]) {
          return sumGameIds;
        }
      }
    }

    return sumGameIds + currentGame.id;
  }, 0);
}

console.log(calculatePossibleGamesIds(games));

// Part two
