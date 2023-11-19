const input = `
lvcNpRHDCnTLCJlL
RFZggsMrjTFGCJmdmd
srsBZgBqwBqRZbzqtHpzzDNtHDqV
CCTPpCvlpzzZQQQflrzbQDttTJcgcggJcHtcddtdhT
nMLBRnGsFFLznRFRLMMNBnNLDRDdhScJccctdSccJJgDDHhH
GVBGVBsLjsrrvfzpjpfQ`;

function convertToPriority(string) {
  return string
    .split('')
    .map((letter) => {
      const lowercasePattern = /^[a-z]+$/;
      const uppercasePattern = /^[A-Z]+$/;

      return lowercasePattern.test(letter)
        ? letter.charCodeAt(0) - 96
        : uppercasePattern.test(letter)
        ? letter.charCodeAt(0) - 38
        : 0;
    })
    .sort((a, b) => a - b)
    .filter((num, i, arr) => num != arr[i - 1]);
  // Sorted and filtered so it's easier to find same number
}

function calculatePrioritiesSum(data) {
  let convertedData = data.split('\n');
  if (convertedData[0] === '') convertedData = convertedData.slice(1);

  let sum = 0;

  for (let i = 2; i < convertedData.length; i += 3) {
    const [firstElf, secondElf, thirdElf] = [
      convertToPriority(convertedData[i - 2]),
      convertToPriority(convertedData[i - 1]),
      convertToPriority(convertedData[i]),
    ];

    firstElf.forEach((num) => {
      const secondEl = secondElf.includes(num);
      const thirdEl = thirdElf.includes(num);

      if (secondEl && thirdEl) {
        sum += num;
      }
    });
  }

  return sum;
}

console.log(calculatePrioritiesSum(input));
