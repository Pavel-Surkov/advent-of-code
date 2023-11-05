const fakeData = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

// TODO: Bad solution, should be a better one
function getMaxCalories(caloriesInput, count) {
  const caloriesCounts = caloriesInput.split('\n').map((item) => Number(item));

  let caloriesSum = [];
  let currentCalories = 0;

  for (let i = 0; i < caloriesCounts.length; i++) {
    currentCalories += caloriesCounts[i];

    // Re-calculate max calories when there is the NEXT Elf or there is the LAST Elf
    if (caloriesCounts[i] === 0 || i === caloriesCounts.length - 1) {
      caloriesSum.push(currentCalories);
      currentCalories = 0;
    }
  }

  return caloriesSum
    .sort((a, b) => a - b)
    .slice(-count)
    .reduce((sum, num) => sum + num, 0);
}

console.log(getMaxCalories(fakeData, 3));
