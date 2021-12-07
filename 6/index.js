var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split(',')

    const preparedData = {}

    arr.forEach(num => {
        if (preparedData[num] === undefined) {
            preparedData[num] = 0
        }

        preparedData[num] += 1
    })

    

    const prepareForLoopNum = Object.keys(preparedData).reduce((acc, num) => {
        const index = 80 - num

        acc[index] = num

        return acc
    }, {})

    console.log(prepareForLoopNum)

    const sortedLoopNum = Object.keys(prepareForLoopNum).sort((a, b) => a - b)

    let i = 2
    let k = 0
    let firstUms = [6, 8]


    while (i <= sortedLoopNum[k]) {
        const firstUmsLength = firstUms.length
        
        for (let k = 0; k < firstUmsLength; k++) {
            let num = firstUms[k]

            const newnum = num === 0 ? 6 : num - 1

            firstUms[k] = newnum

            if (num === 0) {
                firstUms.push(8)
            }
        }

        if (i === 22) {
            console.log(firstUms.length)
        }

        if (i == sortedLoopNum[k]) {
            const timesConst = preparedData[prepareForLoopNum[i]]
            console.log(firstUms.length)

            prepareForLoopNum[i] = timesConst * firstUms.length

            k++
        }

        i++
    }

    const countAll = Object.keys(prepareForLoopNum).reduce((acc, index) => {
        const data = prepareForLoopNum[index]
        acc += data

        return acc
    }, 0)

    console.log(countAll)
} catch(e) {
    console.log('Error:', e.stack);
}

