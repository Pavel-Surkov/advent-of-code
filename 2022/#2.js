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

// TODO: Solve
function getMaxThreeCalories(caloriesInput) {
  const caloriesCounts = caloriesInput.split('\n').map((item) => Number(item));

  let maxCalories = 0;
  let currentCalories = 0;

  for (let i = 0; i < caloriesCounts.length; i++) {
    currentCalories += caloriesCounts[i];

    // Re-calculate max calories when there is the NEXT Elf or there is the LAST Elf
    if (caloriesCounts[i] === 0 || i === caloriesCounts.length - 1) {
      maxCalories = Math.max(maxCalories, currentCalories);
      currentCalories = 0;
    }
  }

  return maxCalories;
}

console.log(getMaxThreeCalories(fakeData));
