var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    const preparedArr = arr.map(row => row.split('').map(el => Number(el)))

    // console.log(preparedArr)

    const rowLength = preparedArr[0].length
    const colLength = preparedArr.length

    let sum = 0

    const cellFlash = (rowIndex, colIndex, visitedCells) => {
        sum++
        preparedArr[rowIndex][colIndex] = 0
        visitedCells.add(`${rowIndex}_${colIndex}`)

        let stack = [];

        const pushToStack = (newRow, newCol) => {
            stack.push({
                row: newRow - 1,
                col: newCol,
            })
            stack.push({
                row: newRow + 1,
                col: newCol,
            })

            stack.push({
                row: newRow,
                col: newCol - 1,
            })

            stack.push({
                row: newRow,
                col: newCol + 1,
            })
            stack.push({
                row: newRow - 1,
                col: newCol - 1,
            })
            stack.push({
                row: newRow - 1,
                col: newCol + 1,
            })
            stack.push({
                row: newRow + 1,
                col: newCol + 1,
            })
            stack.push({
                row: newRow + 1,
                col: newCol - 1,
            })
        }

        pushToStack(rowIndex, colIndex)

            // while not empty
        while (stack.length) {
            let stackData = stack.pop()

            let stackRow = stackData.row
            let stackCol = stackData.col
    
            let coordData = preparedArr[stackRow] !== undefined && preparedArr[stackRow][stackCol] !== undefined ? Number(preparedArr[stackRow][stackCol]) : undefined
    
            if (coordData !== undefined) {
                let newCoordData = coordData + 1

                if (newCoordData > 9) {
                        sum++
                        visitedCells.add(`${stackRow}_${stackCol}`)
    
                        preparedArr[stackRow][stackCol] = 0
    
                        pushToStack(stackRow, stackCol)
                } else {
                    let visited = visitedCells.has(`${stackRow}_${stackCol}`) && coordData === 0

                    if (!visited) {
                        preparedArr[stackRow][stackCol] = newCoordData
                    }
                }
            }
        }
    }

    let step = 0
    let rightStep

    while (rightStep === undefined) {
        sum = 0

        const visitedCells = new Set()
        let preparedArrLength = preparedArr.length

        for (let rowIndex = 0; rowIndex < preparedArrLength; rowIndex++) {
            
            let rowData = preparedArr[rowIndex]
            let rowDataLength = rowData.length

            for (let colIndex = 0; colIndex < rowDataLength; colIndex++) {
                let colData = rowData[colIndex]

                let newCellValue = Number(colData) + 1

                
                let visitedAndZero = colData === 0 && visitedCells.has(`${rowIndex}_${colIndex}`)

               
                if (newCellValue > 9) {
                    cellFlash(rowIndex, colIndex, visitedCells)
                } else {
                    if (!visitedAndZero) {
                        preparedArr[rowIndex][colIndex] = newCellValue
                    }
                }
                
            }
        }

        if (sum === 100) {
            rightStep = step + 1
        }

        step++
    }

    console.log(step)
} catch(e) {
    console.log('Error:', e.stack);
}


