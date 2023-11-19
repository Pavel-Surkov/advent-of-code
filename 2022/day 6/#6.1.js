const input = `https://adventofcode.com/2022/day/6/input`;

function getStartMarker(str) {
  let marker = 0;

  for (let i = 3; i < str.length; i++) {
    const noRepeatArr = [
      ...new Set([str[i - 3], str[i - 2], str[i - 1], str[i]]),
    ];

    if (noRepeatArr.length === 4) {
      marker = i + 1;
      break;
    }
  }

  return marker;
}

console.log(getStartMarker(input));
