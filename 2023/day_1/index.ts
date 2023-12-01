import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((line) => line !== '');

// Task #1
function getSumCalibrationValues(lines: string[]) {
  return lines.reduce((calibrationSum, line) => {
    const digits = {
      first: 0,
      last: 0,
    };

    for (let i = 0; i < line.length; i++) {
      const leftPointerNumber = +line[i];
      const rightPointerNumber = +line[line.length - 1 - i];

      if (digits.first && digits.last) {
        break;
      }

      if (!digits.first && !isNaN(leftPointerNumber)) {
        digits.first = leftPointerNumber;
      }

      if (!digits.last && !isNaN(rightPointerNumber)) {
        digits.last = rightPointerNumber;
      }
    }

    return calibrationSum + Number(`${digits.first}${digits.last}`);
  }, 0);
}

console.log(getSumCalibrationValues(lines));

// Task #2
function getSumActualCalibrationValues(lines: string[]) {
  const wordDigits = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  return lines.reduce((calibrationSum, line) => {
    const digits = {
      first: 0,
      last: 0,
    };

    let leftWordDigit = '';
    let rightWordDigitReversed = '';

    for (let i = 0; i < line.length; i++) {
      const leftPointer = line[i];
      const rightPointer = line[line.length - 1 - i];

      if (digits.first && digits.last) {
        break;
      }

      if (!digits.first) {
        if (!isNaN(+leftPointer)) {
          digits.first = +leftPointer;
        }

        leftWordDigit = leftWordDigit + leftPointer;

        wordDigits.forEach((word, i) =>
          leftWordDigit.includes(word) ? (digits.first = i + 1) : false
        );
      }

      if (!digits.last) {
        if (!isNaN(+rightPointer)) {
          digits.last = +rightPointer;
        }

        rightWordDigitReversed = rightWordDigitReversed + rightPointer;
        const rightWordDigit = rightWordDigitReversed
          .split('')
          .reverse()
          .join('');

        wordDigits.forEach((word, i) =>
          rightWordDigit.includes(word) ? (digits.last = i + 1) : false
        );
      }
    }

    return calibrationSum + Number(`${digits.first}${digits.last}`);
  }, 0);
}

console.log(getSumActualCalibrationValues(lines));
