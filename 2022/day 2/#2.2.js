const input = `
A Y
B X
C Z`;

// Rock Paper Scissors -> ABC -> XYZ -> 1 | 2 | 3 + 0 | 3 | 6

const win = {
  res: 'win',
  A: 'Y',
  B: 'Z',
  C: 'X',
};

const lose = {
  res: 'lose',
  A: 'Z',
  B: 'X',
  C: 'Y',
};

const draw = {
  res: 'draw',
  A: 'X',
  B: 'Y',
  C: 'Z',
};

const resultVariants = {
  X: lose,
  Y: draw,
  Z: win,
};

function calculateScore(enemyVar, res) {
  const result = resultVariants[res];
  const myVar = result[enemyVar];

  const winScore = result.res === 'win' ? 6 : result.res === 'lose' ? 0 : 3;
  const rpsScore = myVar === 'X' ? 1 : myVar === 'Y' ? 2 : 3;

  return winScore + rpsScore;
}

function getFinalScore(strategy) {
  return strategy
    .split('\n')
    .filter((str) => str.length === 3)
    .reduce((sumScore, round) => {
      const [enemyVar, myVar] = round.split(' ');
      const score = calculateScore(enemyVar, myVar);

      return sumScore + score;
    }, 0);
}

console.log(getFinalScore(input));
