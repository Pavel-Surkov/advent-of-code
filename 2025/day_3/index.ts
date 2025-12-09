import fs from 'fs';
import path from 'path';
import { withTimeLog } from '../../withTimeLog';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((line) => line !== '');

// У строки убираем последний символ и ищем в строке максимальную цифру, это будет десяток
// Далее получаем подстроку с цифрами правее и оттуда берем максимальную цифру, это еденицы
function getMaxVoltageSum(lines: string[]) {
  return lines.reduce((sum, batteryBank) => {
    const { maxDecValue, maxDecIndex } = batteryBank
      .slice(0, batteryBank.length - 1)
      .split('')
      .reduce(
        (dec, current, currentIndex) => {
          if (+current > dec.maxDecValue) {
            return {
              maxDecValue: +current,
              maxDecIndex: currentIndex,
            };
          }

          return dec;
        },
        {
          maxDecValue: 0,
          maxDecIndex: 0,
        }
      );

    const maxUnitValue = batteryBank
      .slice(maxDecIndex + 1, batteryBank.length)
      .split('')
      .reduce((max, current) => (max > +current ? max : +current), 0);

    return sum + Number(`${maxDecValue}${maxUnitValue}`);
  }, 0);
}

console.log('Part one.');
withTimeLog(getMaxVoltageSum, lines); // 17207
