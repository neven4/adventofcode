var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split(',')

    const soretedArr = arr.sort((a, b) => a - b)

    const medianIndexLength = soretedArr.length

    const getMedianNumber = () => {
        const isOdd = medianIndexLength % 2 !== 0

        if (isOdd) {
            const oddIndex = (medianIndexLength + 1) / 2 - 1

            return Number(soretedArr[oddIndex])
        } else {
            const firstNum = soretedArr[medianIndexLength / 2 - 1]
            const secondNum = soretedArr[medianIndexLength / 2]

            const evenMedian = (Number(firstNum) + Number(secondNum)) / 2

            return evenMedian
        }


    }

    const median = getMedianNumber()

    let fuelCount = 0

    soretedArr.forEach(num => {
        fuelCount += Math.abs(num - median)
    })

    console.log(fuelCount)
} catch(e) {
    console.log('Error:', e.stack);
}

