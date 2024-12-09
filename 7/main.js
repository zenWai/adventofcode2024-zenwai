const fs = require('fs')

async function getFileData() {
  const data = await fs.promises.readFile('7/input.txt', 'utf8');
  return data;
}

function recursiveTree(arrNumbers, resultNeeded, part2Concatenate = false) {
  const currResult = arrNumbers[0];
  const pos = 1;

  const tryNext = (currResult, pos) => {
    if (pos === arrNumbers.length) return currResult === resultNeeded;

    // adition
    if (tryNext(currResult + arrNumbers[pos], pos + 1)) return true;

    // Multiply
    if (tryNext(currResult * arrNumbers[pos], pos + 1)) return true;

    if (part2Concatenate) {
      // concatenate
      const concatenate = `${currResult}${arrNumbers[pos]}`
      if (tryNext(Number(concatenate), pos + 1)) return true;
    }
    return false;

  }

  return tryNext(currResult, pos)
}

async function part1() {
  const data = await getFileData();
  const linesData = data.trim().split('\n')
  let sum = 0
  for (const line of linesData) {
    const [resultNeeded, numbers] = line.split(':');
    const arrNumbers = numbers.trim().split(' ').map(Number);
    if (recursiveTree(arrNumbers, Number(resultNeeded))) {
      sum += Number(resultNeeded);
    }

  }
  console.log(sum)
}

async function part2() {
  const data = await getFileData();
  const linesData = data.trim().split('\n')
  let sum = 0
  for (const line of linesData) {
    const [resultNeeded, numbers] = line.split(':');
    const arrNumbers = numbers.trim().split(' ').map(Number);
    if (recursiveTree(arrNumbers, Number(resultNeeded), true)) {
      sum += Number(resultNeeded);
    }

  }
  console.log(sum)
}

part1()
part2()