import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((line) => line !== '');

type DigitWithPosition = {
  num: number;
  y: number;
  x: number;
};

type NumberWithPosition = Omit<DigitWithPosition, 'x'> & { x: number[] };

function getPartNumbers(lines: string[]) {
  // Assume that x = 0, y = 0 in the top left corner
  // FIND NUMBERS, and check if all symbols around are "."
  const numbersArr = lines.reduce((numbers: NumberWithPosition[], line, y) => {
    const lineNumbers = line
      .split('')
      .reduce((digitsData: DigitWithPosition[], current, x) => {
        return !isNaN(+current)
          ? [
              ...digitsData,
              {
                num: +current,
                x,
                y,
              },
            ]
          : digitsData;
      }, [])
      .reduce((numbersData: NumberWithPosition[], currentData, index, arr) => {
        // digits are together => parts of one number
        if (index !== 0 && currentData.x - arr[index - 1].x === 1) {
          const numberData = numbersData.pop();

          if (numberData) {
            numberData.num = +`${numberData.num}${currentData.num}`;
            numberData.x = [...numberData.x, currentData.x];
            return [...numbersData, numberData];
          }
        }

        return [...numbersData, { ...currentData, x: [currentData.x] }];
      }, []);

    return [...numbers, ...lineNumbers];
  }, []);

  function getAllCoordsAround(position: { x: number[]; y: number }) {
    const topCoordY = position.y - 1;
    const bottomCoordY = position.y + 1;

    const coordsTop = [
      { x: position.x[0] - 1, y: topCoordY },
      ...position.x.map((x) => ({ x, y: topCoordY })),
      { x: position.x[position.x.length - 1] + 1, y: topCoordY },
    ];

    const coordsBottom = [
      { x: position.x[0] - 1, y: bottomCoordY },
      ...position.x.map((x) => ({ x, y: bottomCoordY })),
      { x: position.x[position.x.length - 1] + 1, y: bottomCoordY },
    ];

    const sideCoords = [
      { x: position.x[0] - 1, y: position.y },
      { x: position.x[position.x.length - 1] + 1, y: position.y },
    ];

    return [...coordsTop, ...coordsBottom, ...sideCoords];
  }

  // Part one
  const filteredNumbers = numbersArr.reduce((filtered: number[], current) => {
    const allCoords = getAllCoordsAround(current);

    const isNumberCounts = allCoords.find((coord) => {
      if (!lines[coord.y] || !lines[coord.y][coord.x]) {
        return false;
      }

      const detail = lines[coord.y][coord.x];

      if (detail !== '.') {
        return true;
      }

      return false;
    });

    if (isNumberCounts) {
      return [...filtered, current.num];
    }

    return filtered;
  }, []);

  return filteredNumbers;
}

const numbers = getPartNumbers(lines);

const res = numbers.reduce((sum, detailNumber) => sum + detailNumber, 0);

console.log(res);
