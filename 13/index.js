var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n\n')

    const initailCoord = arr[0].split('\n')
    const fold = arr[1].split('\n')

    let matrix = []

    initailCoord.forEach(coordsData => {
        const coordsArr = coordsData.split(',')
        const yCoord = Number(coordsArr[1])
        const xCoord = Number(coordsArr[0])

        if (matrix[yCoord] === undefined) {
            matrix[yCoord] = []
        }

        matrix[yCoord][xCoord] = '#'
    })

    fold.forEach((foldData, foldIndex) => {
        const foldCords = foldData.replace('fold along ', '')
         
        if (foldCords.indexOf('y=') === 0) {
            const splitByYCoord = Number(foldCords.replace('y=', ''))

            for (let downCoord = splitByYCoord - 1; downCoord >= 0; downCoord--) {
                let upCoord = splitByYCoord + splitByYCoord - downCoord

                if (!matrix[upCoord]) {
                    continue
                }

                matrix[upCoord].forEach((colData, colIndex) => {
                    if (colData === '#') {
                        if (matrix[downCoord] === undefined) {
                            matrix[downCoord] = []
                        }

                        matrix[downCoord][colIndex] = '#'
                    }
                })
            }

            matrix = matrix.slice(0, splitByYCoord)
        }

        if (foldCords.indexOf('x=') === 0) {
            const splitByXCoord = Number(foldCords.replace('x=', ''))

            matrix.forEach((rowData, rowIndex) => {
                for (let leftCoord = splitByXCoord - 1; leftCoord >= 0; leftCoord--) {
                    let rightCoord = splitByXCoord + splitByXCoord - leftCoord
    
                    if (matrix[rowIndex][rightCoord] === '#') {
                        matrix[rowIndex][leftCoord] = '#'
                    }
                }

                matrix[rowIndex] = matrix[rowIndex].slice(0, splitByXCoord)
            })
        }
    })

    const word = matrix.map(rowData => {
        let newRow = ''

        for (let i = 0; i < rowData.length; i++) {
            const cellData = rowData[i]

            if (!cellData) {
                newRow += ' '
            } else {
                newRow += cellData
            }
        }
        return newRow
    })

    console.log(word)
} catch(e) {
    console.log('Error:', e.stack);
}


