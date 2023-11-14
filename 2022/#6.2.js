const input = `https://adventofcode.com/2022/day/6/input`;

function getStartMarker(str) {
  const arr = str.split('');

  let marker = 0;

  for (let i = 13; i < arr.length; i++) {
    const noRepeatArr = [...new Set(arr.slice(i - 13, i + 1))];

    if (noRepeatArr.length === 14) {
      marker = i + 1;
      break;
    }

    // This string is for faser search
    // There is 2246 iterations without this string and 393 with
    // So the function is 5,7 times faster
    i += 13 - noRepeatArr.length;
  }

  return marker;
}

console.log(getStartMarker(input));
