const input = `82-82,8-83
6-98,6-93
56-77,55-82`;

// Find where diff is more and check if its start el is more
function countOverlapPairs(data) {
  const pairsArr = data.split(/\n|,|-/);

  let sum = 0;

  for (let i = 0; i < pairsArr.length; i += 4) {
    const [firstStart, firstEnd, secondStart, secondEnd] = [
      pairsArr[i],
      pairsArr[i + 1],
      pairsArr[i + 2],
      pairsArr[i + 3],
    ].map((str) => Number(str));

    const isOverlap = !(firstEnd < secondStart || firstStart > secondEnd);

    if (isOverlap) {
      sum += 1;
    }
  }

  return sum;
}

console.log(countOverlapPairs(input));
