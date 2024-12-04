const fs = require('fs')

async function getFileData() {
  const data = await fs.promises.readFile('4/input.txt', 'utf8');
  return data;
}

function isXmasFound(data, maxRows, maxCols, row, col, rowDirection, colDirection) {
  const word = 'XMAS'
  // skip 'X'
  for (let i = 1; i < word.length; i++) {

    const newRow = row + (rowDirection * i);
    const newCol = col + (colDirection * i);
    if (newRow > maxRows ||
      newCol > maxCols ||
      newRow < 0 ||
      newCol < 0 ||
      data[newRow][newCol] !== word[i]
    ) {
      return false;
    }
  }
  return true;
}

function isSequenceFound(data, currRow, currCol) {
  /**S S
   *  A
   * M M
   *
   */
    // find SAM || MAS 2 times
  let counter = 0;
  const direction = [
    // [topRow, topCol, bottomRow, bottomCol]
    [currRow - 1, currCol - 1, currRow + 1, currCol + 1], // from top-left to bottom-right
    [currRow - 1, currCol + 1, currRow + 1, currCol - 1]// from top-right to bottom-left
  ]

  for ([topRow, topCol, bottomRow, bottomCol] of direction) {
    const word = data[topRow][topCol] + 'A' + data[bottomRow][bottomCol]
    if (word === 'SAM' || word === 'MAS') counter++;
  }

  return counter === 2;
}

async function part1() {
  const data = await getFileData();
  const grid = data.split('\n').map((line) => line.split(''))
  //up, down, right, left, up-right, up-left, down-right, down-left
  const directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, -1],
    [1, 1],
    [1, -1]
  ]
  // find x
  // find xmas each direction
  // get false or true count++
  let count = 0;
  for (let currRow = 0; currRow < grid.length; currRow++) {
    for (let currCol = 0; currCol < grid[currRow].length; currCol++) {
      console.log(grid[currRow][currCol])

      if (grid[currRow][currCol] === 'X') {

        for (const [rowDirection, colDirection] of directions) {
          if (isXmasFound(grid, grid.length, grid[currRow].length, currRow, currCol, rowDirection, colDirection)) {
            count++;
          }
        }
      }
    }
  }

  console.log(count)
}

async function part2() {
  const data = await getFileData();
  const grid = data.split('\n').map((line) => line.split(''))

  let count = 0;
  for (let currRow = 1; currRow < grid.length - 1; currRow++) {
    for (let currCol = 1; currCol < grid[currRow].length - 1; currCol++) {
      // Find word A, Check diagonal
      // find SAM || MAS 2 times
      if (grid[currRow][currCol] === 'A' &&
        isSequenceFound(grid, currRow, currCol)
      ) {
        count++;
      }

    }
  }
  console.log(count)
}

part1()
part2()