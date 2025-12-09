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

    const maxUnitValue = findMaxNumberInString(
      batteryBank.slice(maxDecIndex + 1, batteryBank.length)
    );

    return sum + Number(`${maxDecValue}${maxUnitValue}`);
  }, 0);
}

console.log('Part one.');
withTimeLog(getMaxVoltageSum, lines); // 17207

// Part two
// Теперь число состоит из 12-ти разрядов. Кастомизируем функцию под любое число разрядов
// Создадим 2 указалетя — левый и правый. Ими будем выделять часть строки в которой
// будем искать для каждого разряда максимальную цифру.
// Далее соединим эти цифры в строку и преобразуем в число
function getMaxVoltageSumV2(lines: string[], digitsCount: number) {
  const finalSum = lines.reduce((sum, batteryBank) => {
    const maxJoltageStr = recursivelyFindMaxJoltage(
      batteryBank,
      digitsCount,
      0
    );

    return sum + Number(maxJoltageStr);
  }, 0);

  return finalSum;
}

console.log('Part two.');
withTimeLog(getMaxVoltageSumV2, lines, 12); // 170997883706617

// ------------------------------------------- Helper functions
function findMaxNumberInString(bank: string) {
  return bank
    .split('')
    .reduce((max, current) => (max > +current ? max : +current), 0);
}

function recursivelyFindMaxJoltage(
  fullBank: string,
  digitsLeft: number,
  lpi: number = 0
): string {
  if (digitsLeft === 0) {
    return '';
  }

  let rpi = fullBank.length - (digitsLeft - 1);

  let nextLpi = lpi;
  let maxNum = 0;

  // Ищем макс цифру между указателями и ее индекс
  for (let i = lpi; i < rpi; i++) {
    const currentNum = +fullBank[i];

    if (currentNum > maxNum) {
      maxNum = currentNum;
      nextLpi = i + 1;
    }
  }

  return `${maxNum}${recursivelyFindMaxJoltage(
    fullBank,
    digitsLeft - 1,
    nextLpi
  )}`;
}
