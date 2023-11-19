import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

const lines = input.split('\n').filter((x) => x.length);

// File or Directory
interface Item {
  type: 'dir' | 'file';
  name: string;
  size: number;
}

interface CommandWithOutput {
  command: string;
  outputs: Item[];
}

interface CommandWithDir extends CommandWithOutput {
  directory: string[];
}

function isCommandString(s: string) {
  return s.startsWith('$');
}

function parseLines(lines: string[]): CommandWithOutput[] {
  return lines.reduce((acc, current, index) => {
    if (isCommandString(current)) {
      const nextCommandIndex =
        lines.slice(index + 1).findIndex(isCommandString) + index + 1;

      const smartIndex =
        nextCommandIndex === index ? lines.length : nextCommandIndex;
      const outputs = lines.slice(index + 1, smartIndex).map((line) => {
        const dirMatch = line.match(/dir (.*)/);
        const fileMatch = line.match(/(.*) (.*)/);

        if (dirMatch && dirMatch[1])
          return {
            type: 'dir',
            size: 0,
            name: dirMatch[1],
          } satisfies Item;
        if (fileMatch)
          return {
            type: 'file',
            size: Number(fileMatch[1]),
            name: fileMatch[2],
          } satisfies Item;
        throw new Error('Unhandled');
      });
      acc.push({ outputs, command: current });
    }
    return acc;
  }, [] as CommandWithOutput[]);
}

function computeDirectories(commands: CommandWithOutput[]): CommandWithDir[] {
  return commands.reduce((acc, current) => {
    const previousDir = acc[acc.length - 1]?.directory;

    const match = current.command.match(/\$ cd (.*)/);
    const directory = match
      ? previousDir
        ? match[1] !== '..'
          ? [...previousDir, match[1]]
          : [...previousDir.slice(0, -1)]
        : [match[1]]
      : [...previousDir];

    acc.push({ ...current, directory });
    return acc;
  }, [] as CommandWithDir[]);
}

const parsed = parseLines(lines);
const withDirs = computeDirectories(parsed);
const lsOutputs = withDirs.filter((cmd) => cmd.command === '$ ls');

// DIRTY CODE STARTS HERE
function computeDirSize(
  cmd: CommandWithDir & { totalSize: number | undefined }
) {
  if (cmd.totalSize !== undefined) return;
  cmd.outputs
    .filter((f) => f.type === 'dir')
    .forEach((dir) => {
      const path = [...cmd.directory, dir.name];
      const dirNode = data.find(
        (datum) => JSON.stringify(datum.directory) === JSON.stringify(path)
      );

      if (!dirNode) throw new Error(`Unknown size ${dir.name}`);
      if (dirNode.totalSize === undefined) {
        computeDirSize(dirNode);
      }
      if (dirNode.totalSize !== undefined) {
        dir.size = dirNode.totalSize;
      } else {
        throw new Error(
          `${dir.name}, ${JSON.stringify(path)}, ${JSON.stringify(dirNode)}`
        );
      }
    });

  const totalSize = cmd.outputs.reduce((sum, f) => sum + f.size, 0);

  cmd.totalSize = totalSize;
  // console.log("Setting size ", totalSize, " to dir", cmd.directory);
}

const data = lsOutputs.map((o) => ({
  ...o,
  totalSize: undefined as undefined | number,
}));

data.forEach(computeDirSize);
console.log(data);

const sum = data
  .filter((d) => d.totalSize)
  .filter((datum) => (datum?.totalSize || 0) <= 100_000)
  .reduce((acc, d) => acc + (d?.totalSize || 0), 0);

console.log(sum);
