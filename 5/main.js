const fs = require('fs')

async function getFileData() {
  const data = await fs.promises.readFile('5/input.txt', 'utf8');
  return data;
}

/**
 *
 * before | after
 * {"before":[after, after,after]}
 * */
function getRulesObj(rules) {
  const rulesObj = {};
  const rulesLines = rules.split('\n')

  for (const line of rulesLines) {
    const [before, after] = line.split('|').map(Number);
    rulesObj[before] ? rulesObj[before].push(after) : rulesObj[before] = [after];
  }
  return rulesObj;
}

async function part1() {
  const data = await getFileData();
  const [rules, pageUpdates] = data.split('\n\n');

  const objRules = getRulesObj(rules);
  // pageUpdate lines
  // create array with values for index
  // index of num > numright? - only if num on rulesObj

  //[
  //     '84', '48', '75',
  //     '73', '16', '59',
  //     '23', '52', '55',
  //     '79', '21'
  //   ],
  // 22, 44 - ir ao 44 rules, confirmar que nao ha nenhum 22
  const saveArr = [];
  const pageUpdatesLines = pageUpdates.split('\n').map((line) => line.split(',').map(Number));

  pageUpdatesLines.forEach((line) => {
    let save = true;
    for (let i = 0; i < line.length - 1; i++) {
      if (objRules[line[i + 1]]) {
        const numRules = objRules[line[i + 1]];
        if (numRules.includes(line[i])) save = false;
      }
    }
    if (save) saveArr.push(line);
  })


  const midNums = saveArr.map((line) => {
    const middle = Math.floor(line.length / 2)
    return line[middle];
  })

  const sumMiddleNums = midNums.reduce((acc, curr) => acc + curr, 0)
  console.log(sumMiddleNums);

}

async function part2() {
  const data = await getFileData();
  const [rules, pageUpdates] = data.split('\n\n');

  const objRules = getRulesObj(rules);

  const saveArr = [];
  const pageUpdatesLines = pageUpdates.split('\n').map((line) => line.split(',').map(Number));

  pageUpdatesLines.forEach((line) => {
    let save = false;
    for (let i = 0; i < line.length - 1; i++) {
      if (objRules[line[i + 1]]) {
        const numRules = objRules[line[i + 1]];
        if (numRules.includes(line[i])) save = true;
      }
    }
    if (save) saveArr.push(line);
  })

  let incorrectLinesNowFixed = [];

  saveArr.forEach((line) => {
    let needsSwapping = true;
    let currentSeq = [...line];
    while (needsSwapping) {
      needsSwapping = false;
      for (let i = 0; i < currentSeq.length - 1; i++) {
        if (objRules[currentSeq[i + 1]]) {
          const numRules = objRules[currentSeq[i + 1]];
          if (numRules.includes(currentSeq[i])) {
            needsSwapping = true; // more passes
            [currentSeq[i], currentSeq[i + 1]] = [currentSeq[i + 1], currentSeq[i]]
          }
        }
      }
    }
    incorrectLinesNowFixed.push(currentSeq);
  })


  const midNums = incorrectLinesNowFixed.map((line) => {
    const middle = Math.floor(line.length / 2)
    return line[middle];
  })

  const sumMiddleNums = midNums.reduce((acc, curr) => acc + curr, 0)
  console.log(sumMiddleNums);

}

part1()
part2();
