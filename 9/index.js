var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    const usfulData = arr.map(str => str.split(''))

    let sum = 0

    usfulData.forEach((rowData, rowIndex) => {
        let colIndex = 0

        while (colIndex < rowData.length) {
            const pointData = Number(rowData[colIndex])

            let yAxisStaitment
            let xAxisStaitment

            if (pointData === 9) {
                colIndex += 1
                continue
            }

            if (rowIndex === 0) {
                const nextRowData = Number(usfulData[rowIndex + 1][colIndex])

                yAxisStaitment = pointData < nextRowData
            }

            if (rowIndex === usfulData.length - 1) {
                const prevRowData =  Number(usfulData[rowIndex - 1][colIndex])

                yAxisStaitment = pointData < prevRowData
            }

            if (colIndex === 0) {
                const nextColData = Number(rowData[colIndex + 1])

                xAxisStaitment = pointData < nextColData
            }

            if (colIndex === rowData.length - 1) {
                const prevColData = Number(rowData[colIndex - 1])

                xAxisStaitment = pointData < prevColData
            }

            if (yAxisStaitment === undefined) {
                const prevRowData =  Number(usfulData[rowIndex - 1][colIndex])
                const nextRowData =  Number(usfulData[rowIndex + 1][colIndex])

                yAxisStaitment = pointData < prevRowData && nextRowData > pointData
            }

            if (xAxisStaitment === undefined) {
                const prevColData =  Number(rowData[colIndex - 1])
                const nextColData =  Number(rowData[colIndex + 1])

                xAxisStaitment = pointData < prevColData && nextColData > pointData
            }

            if (xAxisStaitment && yAxisStaitment) {
                sum += pointData + 1

                colIndex += 2

                continue
            }

            colIndex++
        }
    })

    console.log(sum)
} catch(e) {
    console.log('Error:', e.stack);
}

