import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((line) => line !== '');

function getSumSignalStrength(data: string[]) {
  let x = 1;
  let cycle = 1;
  let addxCycle: 1 | 2 = 1;

  const signalStrengths: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const line = data[i];

    // Signal strength handle
    const parameter = cycle + 20;

    if (parameter % 40 === 0) {
      signalStrengths.push(x * cycle);
    }

    // Cycle and data handle
    if (line !== 'noop') {
      if (addxCycle === 1) {
        addxCycle++;
        i--;
      } else {
        const increaseNum = +line.split(' ')[1];

        addxCycle = 1;
        x += increaseNum;
      }
    }

    cycle++;
  }

  return signalStrengths.reduce((sum, strength) => sum + strength, 0);
}

// Part one
console.log(getSumSignalStrength(lines));
