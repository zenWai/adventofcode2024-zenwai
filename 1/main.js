const fs = require('fs')

async function getFileData() {
  const data = await fs.promises.readFile('1/input.txt', 'utf8');
  return data;
}

function getNumbersArrays(data) {
  const lines = data.split('\n')
  let nums1= [];
  let nums2 = [];
  lines.forEach((line) => {
    if(line.trim()) {
      const [num1,num2] = line.trim().split(/\s+/).map(Number)
      nums1.push(num1)
      nums2.push(num2)
    }
  })

  return [nums1, nums2];
}

function getDifferenceFromNumbersArrays(nums1, nums2) {
  let difference = 0;
  nums1.forEach((num, index) => {
    const diff = Math.abs(num - nums2[index]);
    difference = difference + diff;
  })
  return difference;
}

function objCountOcurrNumbersInArr(arr) {
  let obj = {};
  arr.forEach((num) => {
    obj[num] = obj[num] + 1 || 1;
  })
  return obj;
}

async function Main() {
  const data = await getFileData();
  const [nums1, nums2] = getNumbersArrays(data);

  const answer1 = getDifferenceFromNumbersArrays([...nums1.sort((a,b) => a-b)], [...nums2].sort((a,b) => a-b));
  console.log('answer1', answer1)
  // part2
  const obj = objCountOcurrNumbersInArr(nums2)
  let similarityScore = 0;
  nums1.forEach((num) => {
    if(obj[num]) {
      similarityScore += num * obj[num]
    }
  })
  console.log('answer2', similarityScore)
}

Main();