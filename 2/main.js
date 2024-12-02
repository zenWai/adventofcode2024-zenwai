const fs = require('fs')

async function getFileData() {
  const data = await fs.promises.readFile('2/input.txt', 'utf8');
  return data;
}

function getLinesArr(data) {
  return data.trim().split('\n').map(
    (line) => line.split(/\s+/).map(Number)
  )
}

function isLineSafe(line) {
  let isIncreasing = true;
  let isDecreasing = true;
  for (let i = 1; i < line.length; i++) {
    const dif = line[i - 1] - line[i]

    if (dif < -3 || dif > 3) return false;

    if (dif <= 0) isDecreasing = false; // [9,10] = -1
    if (dif >= 0) isIncreasing = false; // [10,9] = 1
    if (!isDecreasing && !isIncreasing) return false;
  }
  return true;
}

function isLineSafeWithDampner(line) {
  if (isLineSafe(line)) return true;

  // remove 1 nr makes it safe?
  for (let i = 0; i < line.length; i++) {
    if (isLineSafe(line.toSpliced(i, 1))) {
      return true;
    }
  }
  return false;
}

async function part1() {
  const data = await getFileData()
  const linesArray = getLinesArr(data)

  let countLinesSafe = 0;
  linesArray.forEach((line) => {
    countLinesSafe = isLineSafe(line) ? countLinesSafe + 1 : countLinesSafe;
  })
  console.log(countLinesSafe)

}

async function part2() {
  const data = await getFileData()
  const linesArray = getLinesArr(data)

  let countLinesSafeWithDampner = 0;
  linesArray.forEach((line) => {
    countLinesSafeWithDampner = isLineSafeWithDampner(line)
      ? countLinesSafeWithDampner + 1
      : countLinesSafeWithDampner
  })
  console.log(countLinesSafeWithDampner)

}

part1()
part2()