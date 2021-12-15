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

            const cellMatrixData = matrixMap.get(cellIndex) || { connectedCells: [], value: colData, f: 0, g: 0, h:0, visited: false, closed: false, parent: null}

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

    const getWay = (startIndex, endIndex) => {
        let stack = []

        stack.push(startIndex)

        while (stack.length) {
            let lowInd = 0

            for (let i = 0; i < stack.length; i++) {
                const stackData = stack[i]

                let lowIndData = matrixMap.get(stack[lowInd])
                const data = matrixMap.get(stackData)
                
                if (data.f < lowIndData.f) {
                    lowInd = i
                }
            }


            if (stack[lowInd] === endIndex) {
                let curr = matrixMap.get(stack[lowInd])
                let ret = []

                while(curr.parent) {
                    ret.push(curr)

                    curr = curr.parent
                }

                return ret.reverse()
            }

            

            let currentNode = matrixMap.get(stack[lowInd])

            currentNode.closed = true

            matrixMap.set(stack[lowInd], currentNode)

            stack = stack.filter(el => el !== stack[lowInd])

            currentNode.connectedCells.forEach(cellId => {
                let cellData = matrixMap.get(cellId)

                if (cellData.closed) {
                    return
                }

                let gScore = currentNode.g + cellData.value
                let gScoreIsBest = false

                if(!cellData.visited) {
                    gScoreIsBest = true
                    cellData.h = getHeuristicsValue(cellId, endIndex)
                    cellData.visited = true
                    stack.push(cellId)
                    matrixMap.set(cellId, cellData)
                } else if (gScore < cellData.g) {
                    gScoreIsBest = true
                }

                if (gScoreIsBest) {
                    cellData = matrixMap.get(cellId)
                    // Found an optimal (so far) path to this node.  Store info on how we got here and
                    //  just how good it really is...
                    cellData.parent = currentNode
                    cellData.g = gScore
                    cellData.f = cellData.g + cellData.h
                    matrixMap.set(cellId, cellData)
                }
            })
        }

        return []
    }

    let way = getWay('0_0', '499_499')

    let sum = 0

    way.forEach(el => {
        sum += el.value
    })

    console.log(sum)
} catch(e) {
    console.log('Error:', e.stack);
}
