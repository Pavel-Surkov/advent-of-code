const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

function convertToPriority(string) {
  return string.split('').map((letter) => {
    const lowercasePattern = /^[a-z]+$/;
    const uppercasePattern = /^[A-Z]+$/;

    return lowercasePattern.test(letter)
      ? letter.charCodeAt(0) - 96
      : uppercasePattern.test(letter)
      ? letter.charCodeAt(0) - 38
      : 0;
  });
}

function calculatePrioritiesSum(data) {
  const convertedData = data.split('\n');

  return convertedData.reduce((acc, items) => {
    const halfIndex = items.length / 2;

    const [firstCompartment, secondCompartment] = [
      convertToPriority(items.slice(0, halfIndex)),
      convertToPriority(items.slice(halfIndex)),
    ];

    let sameItem = 0;

    for (let firstPriority of firstCompartment) {
      for (let secondPriority of secondCompartment) {
        if (firstPriority === secondPriority) {
          sameItem = firstPriority;
          break;
        }
      }
    }

    return acc + sameItem;
  }, 0);
}

console.log(calculatePrioritiesSum(input));
