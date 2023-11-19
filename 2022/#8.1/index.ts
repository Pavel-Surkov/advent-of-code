import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

function countVisibleTrees(
  set: Set<string>,
  lines: string[],
  isColumn: boolean
) {
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    const hashedValuesStart: { index: number; value: number }[] = [];
    const hashedValuesEnd: { index: number; value: number }[] = [];

    // Two-pointers method
    // For each line count to array visible trees: [1, 2 , 3, 4, 5, 6, 7, 8, 9] - from start and from end
    // (also we need to make sure that start[lastIndex] < end[lastIndex]) or to stop counting if startIndex === endIndex
    //
    // The same is for columns, but we need to make sure that these trees do not repeat so need to store values in Set.
    // Values are strings: `${lineIndex}_${columnIndex}`

    for (let j = 0; j < currentLine.length; j++) {
      const currentTreeHeightStart = +currentLine[j];

      const endLineIndex = currentLine.length - (j + 1);
      const currentTreeHeightEnd = +currentLine[endLineIndex];

      if (j > endLineIndex) {
        break;
      }

      if (j === 0) {
        hashedValuesStart.push({ index: j, value: currentTreeHeightStart });
        hashedValuesEnd.push({
          index: endLineIndex,
          value: currentTreeHeightEnd,
        });
      }

      const maxLeftHeight =
        hashedValuesStart[hashedValuesStart.length - 1].value;
      const maxRightHeight = hashedValuesEnd[hashedValuesEnd.length - 1].value;

      if (maxLeftHeight < currentTreeHeightStart) {
        hashedValuesStart.push({ index: j, value: currentTreeHeightStart });
      }

      if (maxRightHeight < currentTreeHeightEnd) {
        hashedValuesEnd.push({
          index: endLineIndex,
          value: currentTreeHeightEnd,
        });
      }
    }

    // Remove first elements from both arrays beacuse we count them in edgeTreesCount
    hashedValuesStart.forEach((el, index) => {
      if (isColumn) {
        set.add(`${i}_${el.index}`);
      } else {
        set.add(`${el.index}_${i}`);
      }
    });
    hashedValuesEnd.forEach((el, index) => {
      if (isColumn) {
        set.add(`${i}_${el.index}`);
      } else {
        set.add(`${el.index}_${i}`);
      }
    });
  }
}

function getVisibleTrees(field: string) {
  const treeLines = field.split('\n').filter((str) => str !== '');

  const set = new Set<string>();

  const treeCols: string[] = [];

  for (let i = 0; i < treeLines.length; i++) {
    const line = treeLines[i];

    for (let j = 0; j < line.length; j++) {
      const height = line[j];

      treeCols[j] = treeCols[j]
        ? [...treeCols[j], height].join('')
        : String(height);
    }
  }

  countVisibleTrees(set, treeLines, false);
  // Then replace rows with columns and repeat (careful when set.add() - indexes are changed)
  countVisibleTrees(set, treeCols, true);

  // Perimeter - 4 trees in the corners
  // const edgeTreesCount = (treeLines.length + treeLines[0].length) * 2 - 4;
  const interiorTreesCount = Array.from(set).length;

  return interiorTreesCount;
}

console.log(getVisibleTrees(input));
// 1846 is too high
// 1842 is too low
