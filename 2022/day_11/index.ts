import fs from 'fs';
import path from 'path';
import z from 'zod';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const monkeyLines = input.split('\n\n').filter((line) => line !== '');

type Operation = {
  // initialNumber: number | 'old'
  operator: '+' | '*';
  parameter: number | 'old';
};

const operationString = z.union([z.literal('+'), z.literal('*')]);

type MonkeyData = {
  monkey: number;
  items: number[];
  operation: Operation;
  divisibleBy: number;
  trueThrow: number;
  falseThrow: number;
};

type MonkeyDataWithInspections = MonkeyData & { inspections: number };

function parseMonkeyLine(monkeyLines: string[]) {
  return monkeyLines.reduce((data: MonkeyData[], lineStr) => {
    const [
      monkeyId,
      monkeyItems,
      monkeyOperation,
      monkeyTest,
      monkeyIfTrue,
      monkeyIfFalse,
    ] = lineStr.split('\n').map((line) => line.trim());

    const monkey = +monkeyId[monkeyId.length - 2];
    const items = monkeyItems
      .split(':')[1]
      .split(', ')
      .map((item) => +item);
    const divisibleBy = +monkeyTest.split(' ').reverse()[0];
    const trueThrow = +monkeyIfTrue.split(' ').reverse()[0];
    const falseThrow = +monkeyIfFalse.split(' ').reverse()[0];
    const operation: Operation = {
      operator: operationString.parse(monkeyOperation.split(' ').slice(-3)[1]),
      parameter: +monkeyOperation.split(' ').slice(-3)[2] || 'old',
    };

    return [
      ...data,
      {
        monkey,
        items,
        operation,
        divisibleBy,
        trueThrow,
        falseThrow,
      },
    ];
  }, []);
}

const data = parseMonkeyLine(monkeyLines);

const operate = {
  '+': (number: number, parameter: number) => number + parameter,
  '*': (number: number, parameter: number) => number * parameter,
};

function getItemAfterOperation(item: number, operation: Operation) {
  const parameter = operation.parameter === 'old' ? item : operation.parameter;
  return operate[operation.operator](item, parameter);
}

function countMonkeysInspections(monkeysData: MonkeyData[], rounds: number) {
  let withInspections = [...monkeysData].map((data) => ({
    ...data,
    inspections: 0,
  }));

  for (let round = 0; round < rounds; round++) {
    withInspections = withInspections.map((monkeyData) => {
      const inspectionsCount = monkeyData.items.length;

      monkeyData.items.forEach((item) => {
        const newItem = getItemAfterOperation(item, monkeyData.operation);
        const newItemAfterInspect = Math.floor(newItem / 3);
        const matchesTest = newItemAfterInspect % monkeyData.divisibleBy === 0;

        const nextMonkeyId = matchesTest
          ? monkeyData['trueThrow']
          : monkeyData['falseThrow'];
        withInspections[nextMonkeyId].items.push(newItemAfterInspect);
      });

      monkeyData.items = [];

      return {
        ...monkeyData,
        inspections: monkeyData.inspections + inspectionsCount,
      };
    });

    console.log(withInspections);
  }

  return withInspections;
}

const monkeyDataWithInspections = countMonkeysInspections(data, 20);

function countMonkeyBusiness(
  data: MonkeyDataWithInspections[],
  topMonkeysCount: number
) {
  return data
    .map((currentMonkey) => currentMonkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, topMonkeysCount)
    .reduce((level, inspections) => level * inspections);
}

// Get sum of top 2 monkey inspections
console.log(countMonkeyBusiness(monkeyDataWithInspections, 2));
