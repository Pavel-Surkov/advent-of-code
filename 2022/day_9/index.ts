import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((line) => line !== '');

// Only back or side direactions
const backDirections = new Set().add('LR').add('DU');

function getTailPositionsCount(arr: string[]) {
  for (let i = 1; i < arr.length; i++) {
    const [last, next] = [arr[i - 1].split(' '), arr[i].split(' ')];

    const directions = [last[0], next[0]].sort().join('');

    if (backDirections.has(directions)) {
      console.log('back', directions);
    } else {
      console.log('side', directions);
    }
  }
}

console.log(getTailPositionsCount(lines));
