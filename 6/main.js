const fs = require('fs')

async function getFileData() {
  const data = await fs.promises.readFile('6/input.txt', 'utf8');
  return data;
}

function moveGuard(startRow, startCol, grid, checkIsLooping = false) {
  // goingUp = [-1, 0]
  // goingRight = [0,1]
  // goingDown = [1,0]
  // goingLeft = [0,-1]
  // x + (-1)
  // newRow = x + rowDirection

  let movingTo = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ]
  let movingDirection = 0;
  const visited = new Set();
  let isLooping = false;
  while (true) {
    // start going up
    // always turn right -> go up, right, down, left
    // index 0 grid[0].length 1
    if (checkIsLooping) {
      const visitedPos = `${startRow}, ${startCol}, ${movingDirection}`
      if (visited.has(visitedPos)) {
        isLooping = true;
        break;
      }
      visited.add(visitedPos);
    }

    let checkRow = startRow + (movingTo[movingDirection][0]);
    let checkCol = startCol + (movingTo[movingDirection][1]);
    if (
      checkRow < 0 ||
      checkRow > grid.length - 1 ||
      checkCol < 0 ||
      checkCol > grid[0].length - 1
    ) {
      grid[startRow][startCol] = 'X';
      break;
    }

    if (grid[checkRow][checkCol] === '#') {
      /** #
       *  ^ # ?
       * */

      while (grid[checkRow][checkCol] === '#') {
        movingDirection = Math.floor((movingDirection + 1) % 4); // turn right
        checkRow = startRow + (movingTo[movingDirection][0]);
        checkCol = startCol + (movingTo[movingDirection][1]);

      }
      grid[startRow][startCol] = 'X';
      startRow = checkRow;
      startCol = checkCol;
    }


    grid[startRow][startCol] = 'X';
    startRow = checkRow;
    startCol = checkCol;

  }

  return isLooping
}


function getStartRowAndCol(grid) {
  let startRow;
  let startCol;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].indexOf('^') !== -1) {
      startRow = i;
      startCol = grid[i].indexOf('^');
      break;
    }
  }
  return [startRow, startCol]
}

async function part1() {
  const data = await getFileData();
  const grid = data.split('\n').map((row) => row.split(''));


  let [startRow, startCol] = getStartRowAndCol(grid);
  moveGuard(startRow, startCol, grid)

  let counter = 0;

  for (let i = 0; i < grid.length; i++) {
    for (const char of grid[i]) {
      if (char === 'X') counter++;
    }
  }

  console.log(counter)
}

async function part2() {
  const data = await getFileData();
  const grid = data.split('\n').map((row) => row.split(''));

  let [startRow, startCol] = getStartRowAndCol(grid);
  moveGuard(startRow, startCol, grid)

  // get all positions of X
  // change each X for a #
  // check if looping, counter++
  const guardVisited = [];

  // get all positions of X except the starting position
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'X' && !(i === startRow && j === startCol)) {
        guardVisited.push([i, j]);
      }
    }
  }

  let counterColisionsThatLoop = 0
  for (const position of guardVisited) {
    const gridWithNewColision = structuredClone(grid);
    gridWithNewColision[position[0]][position[1]] = '#';
    const isLooping = moveGuard(startRow, startCol, gridWithNewColision, true);
    if (isLooping) counterColisionsThatLoop++;
  }

  console.log(counterColisionsThatLoop)

}


part1()
part2()