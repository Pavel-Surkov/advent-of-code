import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

// Quick binary search implementation
function binarySearch<T>(value: T, arr: T[]) {
  if (arr.length === 0) return false;

  const centerIndex = Math.floor(arr.length / 2);

  if (value === arr[centerIndex]) {
    return true;
  }

  if (value > arr[centerIndex]) {
    return binarySearch(value, arr.slice(centerIndex + 1));
  } else {
    return binarySearch(value, arr.slice(0, centerIndex));
  }
}

const sumPoints = input
  .split('\n')
  .filter((line) => line !== '')
  .map((line) =>
    line
      .split(/\:|\|/)
      .slice(1)
      .map((numbers) =>
        numbers
          .trim()
          .split(' ')
          .filter((number) => number !== '')
          .map((n) => +n)
      )
  )
  .reduce((sumPoints, numbers) => {
    const [winningNumbers, sortedCardNumbers] = [
      numbers[0],
      numbers[1].sort((a, b) => a - b),
    ];

    let currentPoints = 0;

    winningNumbers.forEach((num) => {
      // sortedCardNumbers.includes(num) is better
      if (binarySearch(num, sortedCardNumbers)) {
        currentPoints === 0 ? (currentPoints = 1) : (currentPoints *= 2);
      }
    });

    return sumPoints + currentPoints;
  }, 0);

console.log(sumPoints);
