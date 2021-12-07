var fs = require('fs');

function summize(num) {
    if (num == 0) 
        return 0;
    else {
        return (num + summize(num - 1));
    }
  }

  const prepareData = (num) => {
    const preparedNum = Number(num)

    let length = 1
    let i = 1

    while (i <= preparedNum) {
        if ((i - 1 % 7) === 0) {
            length = length + 1

            const countInslideNumber = Math.floor((preparedNum - i) / 8)

            length = length + summize(countInslideNumber)
        }

        i++
    }
    console.log(length)

    return length
  }

  function solution(input, days) {
    const fish = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    input.forEach((n) => fish[n]++);
  
    for (let day = 0; day < days; day++) {
      fish[7] += fish[0];
      
      fish.push(fish.shift());
    }
  
    return fish.reduce((acc, n) => acc + n, 0);
  }

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split(',')

    const kek = solution(arr, 80)

    console.log(kek)

    const preparedData = {}
    prepareData(22)

    // arr.forEach(num => {
    //     if (preparedData[num] === undefined) {
    //         preparedData[num] = 0
    //     }

    //     preparedData[num] += 1
    // })

    

    // const prepareForLoopNum = Object.keys(preparedData).reduce((acc, num) => {
    //     const index = 80 - num

    //     acc[index] = num

    //     return acc
    // }, {})

    // // const sortedLoopNum = Object.keys(prepareForLoopNum).sort((a, b) => a - b)


    // const ppe = Object.keys(prepareForLoopNum).map((num, index) => {
    //     const preparedNum = Number(num)
    //     const numData = preparedData[prepareForLoopNum[preparedNum]]

    //     let length = 2
    //     let i = 1

    //     while (i <= preparedNum) {
    //         const countInslideNumber = Math.floor((preparedNum - i) / 9)
            
    //         length = length + summize(countInslideNumber) + summize(countInslideNumber)

    //         length = length + 1
    //         i = i + 7
    //     }

    //     return length * numData
    // })
    // console.log(ppe)


    // const countAll = ppe.reduce((acc, index) => {
    //     acc += index

    //     return acc
    // }, 0)

    // console.log(countAll)
} catch(e) {
    console.log('Error:', e.stack);
}

