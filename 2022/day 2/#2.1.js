const input = `
A Y
B X
C Z`;

// Rock Paper Scissors -> ABC -> XYZ -> 1 | 2 | 3 + 0 | 3 | 6

// Try out with arrays
const enemyVariants = ['A', 'B', 'C'];
const myVariants = ['X', 'Y', 'Z'];

function calculateScore(enemyVar, myVar) {
  const myIndex = myVariants.indexOf(myVar);
  const enemyIndex = enemyVariants.indexOf(enemyVar);

  const isWin = myIndex === enemyIndex + 1 || myIndex === enemyIndex - 2;
  const isDraw = myIndex === enemyIndex;

  const winScore = isDraw ? 3 : isWin ? 6 : 0;
  const rpsScore = myIndex + 1;

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
