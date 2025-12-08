import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split(',').filter((line) => line !== '');

function sumInvalidIds(idLines: string[]) {
  return idLines
    .filter((currentRange) => {
      const [min, max] = currentRange.split('-');

      if (min.length % 2 && max.length === min.length) {
        return false;
      }

      return true;
    })
    .reduce((sum, currentRange) => {
      const [min, max] = currentRange.split('-').map((str) => +str);
      let currentValue = min;

      while (currentValue <= max) {
        const id = currentValue.toString();

        // Если число состоит из нечетного количества цифр, добавляем разряд (772 -> 1000, ...)
        if (id.length % 2) {
          currentValue = Number(`1${new Array(id.length).fill(0).join('')}`);
          continue;
        }

        const middleIndex = Math.floor(id.length / 2);
        const [left, right] = [
          id.slice(0, middleIndex),
          id.slice(middleIndex, id.length),
        ];

        if (left !== right) {
          currentValue =
            left < right // Если правая часть больше левой, то совместив 2 левые части мы получим число меньше чем минимального в range
              ? Number(`${Number(left) + 1}${Number(left) + 1}`)
              : Number(`${left}${left}`);
        } else {
          sum += currentValue;
          currentValue = Number(`${Number(left) + 1}${Number(left) + 1}`);
        }
      }

      return sum;
    }, 0);
}

const res = sumInvalidIds(lines);
// 18828970995 is too low
// 18898578637 is too high
// 18832188853 is not correct???
// 18893502033 nahuy!
console.log(`Part one answer: ${res}`);
