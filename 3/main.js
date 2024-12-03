const fs = require('fs')

async function getFileData() {
  const data = await fs.promises.readFile('3/input.txt', 'utf8');
  return data;
}

async function part1() {
  const data = await getFileData()
  const regex = /mul\([0-9]+,[0-9]+\)/g
  const matches = data.match(regex)
  let sum = 0;
  matches.forEach((string) => {
    const numbers = string.slice(4, -1).split(',')
    sum += numbers[0] * numbers[1]
  })

  console.log(sum)
}

async function part2() {
  const data = await getFileData()

  const dataBetween = data.split(/do\(\)|don't\(\)/);
  const allDoDont = data.match(/do\(\)|don't\(\)/g) || [];

  console.log(dataBetween.length)
  console.log(allDoDont.length)
  let weDoingIt = true;
  let sum = 0;
  dataBetween.forEach((string, index) => {
    // skip first
    if (index > 0) {
      weDoingIt = allDoDont[index - 1] === "do()";
    }

    if (weDoingIt) {
      const regex = /mul\([0-9]+,[0-9]+\)/g
      const matches = string.match(regex)
      matches.forEach((string) => {
        const numbers = string.slice(4, -1).split(',')
        sum += numbers[0] * numbers[1]
      })

    }
  })
  console.log(sum);
}

part1()
part2()