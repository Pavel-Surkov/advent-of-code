const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

const tasksInput = `
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

// Convertation takes pretty long time
function convertInput(input) {
  const lines = input.split('\n').filter((line) => line !== '');

  const stacks = new Map();

  // Start from the end because stacks fill this way
  // Lines[length - 2] because don't need last line of numbers
  for (let i = lines.length - 2; i >= 0; i--) {
    // All lines length are equal to 35 characters
    const line = lines[i];
    const lineArr = [];

    for (let j = 0; j < line.length; j += 4) {
      lineArr.push(String(line[j] + line[j + 1] + line[j + 2]));
    }

    // Convert lines to stacks
    lineArr.forEach((item, index) => {
      if (item !== '   ') {
        const currentStack = stacks.get(index);

        if (Array.isArray(currentStack)) {
          stacks.set(index, [...currentStack, item[1]]);
        } else {
          stacks.set(index, [item[1]]);
        }
      }
    });
  }

  return stacks;
}

// Convert lines to stacks hash
const converted = convertInput(input);

function getTopCratesAfterCrane(tasks, stacksHash) {
  const tasksNumbers = tasks
    .split(/\n|from|to|move/)
    .filter(Number)
    .map(Number);

  for (let i = 0; i < tasksNumbers.length; i += 3) {
    // -1 because in hask stacks begin with 0, not with 1
    const [count, from, to] = [
      tasksNumbers[i],
      tasksNumbers[i + 1] - 1,
      tasksNumbers[i + 2] - 1,
    ];

    const stackFrom = stacksHash.get(from);
    const stackTo = stacksHash.get(to);

    // !Only difference from 5.1 is removing reverse() method from the line below
    const removed = stackFrom.slice(-count);
    stackFrom.splice(-count, count);

    stacksHash.set(to, [...stackTo, ...removed]);
  }

  let lastCrates = [];

  stacksHash.forEach((stack) => lastCrates.push(stack[stack.length - 1]));

  return lastCrates.join('');
}

console.log(getTopCratesAfterCrane(tasksInput, converted));
