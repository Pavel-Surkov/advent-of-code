import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const [time, distance] = input.split('\n').map((line) =>
  line
    .split(' ')
    .filter((symbol) => symbol.match(/[0-9]/g))
    .map((num) => +num)
);

// hold 1ms => 1ms/second * 6 seconds
// hold 2ms => 2ms/second * 5 seconds
// hold 3ms => 3ms/second * 4 seconds

const res = time.reduce((betterRecordsCount, currentTime, index) => {
  const currentDistance = distance[index];
  const halfTime = Math.ceil(currentTime / 2); // The biggest distance

  let nonRecordTime = 0;

  for (let time = halfTime; time > 0; time--) {
    if (time * (currentTime - time) <= currentDistance) {
      nonRecordTime = time;
      break;
    }
  }

  return [...betterRecordsCount, currentTime - 1 - nonRecordTime * 2];

  // TODO: Adapt binary search to find needed values to make it faster
}, [] as number[]);

// Part one solution
console.log(res.reduce((r, n) => r * n));

const [secondTime, secondDistance] = input.split('\n').map(
  (line) =>
    +line
      .split('')
      .filter((symbol) => symbol.match(/[0-9]/g))
      .join('')
);

let nonRecordTime = 0;

for (let time = Math.ceil(secondTime / 2); time > 0; time--) {
  if (time * (secondTime - time) <= secondDistance) {
    nonRecordTime = time;
    break;
  }
}
// Part two solution
console.log(secondTime - 1 - nonRecordTime * 2);
