var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const rowsData = data.split('\n')

    let topMatrix = rowsData.map(row => {
        const newRow = []
        const numberedRow = row.split('').map(num => Number(num))

        for (let i = 0; i < 5; i++) {
            numberedRow.forEach(colData => {
                let newColData = colData + i > 9 ? colData + i - 9 : colData + i

                newRow.push(newColData)
            })
        }

        return newRow
    })

    let matrix = [...topMatrix]

    for (let k = 0; k < 4; k++) {
        const newMatrix = []

        topMatrix.forEach((row, rowI) => {
            if (!newMatrix[rowI]) {
                newMatrix[rowI] = []
            }
            row.forEach((colData, colI) => {
                if (!newMatrix[rowI][colI]) {
                    newMatrix[rowI][colI] = []
                }

                newMatrix[rowI][colI] = colData + k + 1 > 9 ? colData + k + 1 - 9 : colData + k + 1
            })
        })

        matrix = [...matrix, ...newMatrix]
    }

    const matrixMap = new Map()

    matrix.forEach((rowData, rowIndex) => {
        rowData.forEach((colData, colIndex) => {
            const cellIndex = `${rowIndex}_${colIndex}`

            const cellMatrixData = matrixMap.get(cellIndex) || { connectedCells: [], value: colData}

            if (rowData[rowIndex + 1] !== undefined) {
                const cell = `${rowIndex + 1}_${colIndex}`
                cellMatrixData.connectedCells.push(cell)
            }

            if (rowData[rowIndex - 1] !== undefined) {
                const cell = `${rowIndex - 1}_${colIndex}`
                cellMatrixData.connectedCells.push(cell)
            }

            if (matrix[colIndex - 1] !== undefined) {
                const cell = `${rowIndex}_${colIndex - 1}`
                cellMatrixData.connectedCells.push(cell)
            }

            if (matrix[colIndex + 1] !== undefined) {
                const cell = `${rowIndex}_${colIndex + 1}`

                cellMatrixData.connectedCells.push(cell)
            }

            matrixMap.set(cellIndex, cellMatrixData)
        })
    })
    
    const getHeuristicsValue = (pos0, pos1) =>{
        const [x0, y0] = pos0.split('_')
        const [x1, y1] = pos1.split('_')

          var d1 = Math.abs(x1 - x0)

          var d2 = Math.abs(y1 - y0)

          return d1 + d2;
        }
    
    const findway = (startI, finishI) => {
        const distances = new Map()
        const priorities = new Map()
        const visited = []

        matrixMap.forEach((data, key) => {
            distances.set(key, Number.MAX_VALUE)
            priorities.set(key, Number.MAX_VALUE)
        })

        distances.set(startI, 0)
        priorities.set(startI, getHeuristicsValue(startI, finishI))

        while (true) {
            let lowestPriority = Number.MAX_VALUE
            let lowestPriorityIndex = -1

            priorities.forEach((data, key) => {
                if (data < lowestPriority && !visited[key]) {
                    lowestPriority = data
                    lowestPriorityIndex = key
                }
            })

            if (lowestPriorityIndex === -1) {
                return -1;
            } else if (lowestPriorityIndex === finishI) {
                return distances.get(lowestPriorityIndex)
            }

            const lowestPriorityMatrixData = matrixMap.get(lowestPriorityIndex)

            lowestPriorityMatrixData.connectedCells.forEach(cellIndex => {
                if (!visited[cellIndex]) {
                    if (distances.get(lowestPriorityIndex) + matrixMap.get(cellIndex).value < distances.get(cellIndex)) {
                        distances.set(cellIndex, distances.get(lowestPriorityIndex) + matrixMap.get(cellIndex).value)
                        priorities.set(cellIndex, distances.get(cellIndex) + getHeuristicsValue(cellIndex, finishI))
                    }
                }
            })
            
            visited[lowestPriorityIndex] = true;
        }
    }

    let kek = findway('0_0', '499_499')

    console.log(kek)
} catch(e) {
    console.log('Error:', e.stack);
}



