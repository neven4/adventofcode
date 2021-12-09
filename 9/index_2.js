var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    const usfulData = arr.map(str => str.split(''))

    let treeLargestBasins = []

    const setBasin = (num) => {
      treeLargestBasins.push(num)
    }

    const getBasinFromFieldCoord = (value, rowIndex, colIndex) => {
      const setOfCoords = new Set()

      let stack = [];

      stack.push({
        row: rowIndex - 1,
        col: colIndex,
        prevValue: value,
      })

      stack.push({
        row: rowIndex + 1,
        col: colIndex,
        prevValue: value,
      })

      stack.push({
        row: rowIndex,
        col: colIndex - 1,
        prevValue: value,
      })
  
      stack.push({
        row: rowIndex,
        col: colIndex + 1,
        prevValue: value,
      })

      // while not empty
      while (stack.length) {
          let stackData = stack.pop()
          let stackRow = stackData.row
          let stackCol = stackData.col
          let prevValue = stackData.prevValue

          let coordData = usfulData[stackRow] !== undefined && usfulData[stackRow][stackCol] !== undefined ? Number(usfulData[stackRow][stackCol]) : undefined

          let coordStr = `${stackRow}_${stackCol}`

          if (coordData !== undefined && (prevValue < coordData) && coordData !== 9 && !setOfCoords.has(coordStr)) {
            setOfCoords.add(coordStr)

            stack.push({
              row: stackRow - 1,
              col: stackCol,
              prevValue: coordData,
            })

            stack.push({
              row: stackRow + 1,
              col: stackCol,
              prevValue: coordData,
            })

            stack.push({
              row: stackRow,
              col: stackCol - 1,
              prevValue: coordData,
            })

            stack.push({
              row: stackRow,
              col: stackCol + 1,
              prevValue: coordData,
            })
          }
      }

      return setOfCoords.size
    }

    usfulData.forEach((rowData, rowIndex) => {
        let colIndex = 0

        while (colIndex < rowData.length) {
            const pointData = Number(rowData[colIndex])

            let yAxisStaitment
            let xAxisStaitment

            let nextRowData
            let prevRowData
            let nextColData
            let prevColData

            if (pointData === 9) {
                colIndex += 1
                continue
            }

            if (rowIndex === 0) {
                nextRowData = Number(usfulData[rowIndex + 1][colIndex])

                yAxisStaitment = pointData < nextRowData
            }

            if (rowIndex === usfulData.length - 1) {
                prevRowData =  Number(usfulData[rowIndex - 1][colIndex])

                yAxisStaitment = pointData < prevRowData
            }

            if (colIndex === 0) {
                nextColData = Number(rowData[colIndex + 1])

                xAxisStaitment = pointData < nextColData
            }

            if (colIndex === rowData.length - 1) {
                prevColData = Number(rowData[colIndex - 1])

                xAxisStaitment = pointData < prevColData
            }

            if (yAxisStaitment === undefined) {
                prevRowData =  Number(usfulData[rowIndex - 1][colIndex])
                nextRowData =  Number(usfulData[rowIndex + 1][colIndex])

                yAxisStaitment = pointData < prevRowData && nextRowData > pointData
            }

            if (xAxisStaitment === undefined) {
                prevColData =  Number(rowData[colIndex - 1])
                nextColData =  Number(rowData[colIndex + 1])

                xAxisStaitment = pointData < prevColData && nextColData > pointData
            }

            if (xAxisStaitment && yAxisStaitment && nextRowData !== 9 && prevRowData !== 9 && nextColData !== 9 && prevRowData !== 9) {

              const pep = getBasinFromFieldCoord(pointData, rowIndex, colIndex)

              const basin = pep + 1
              setBasin(basin)

              colIndex += 2

              continue
            }

            colIndex++
        }
    })

    treeLargestBasins.sort((a, b) => a - b)

    const treeLargestBasinsLength = treeLargestBasins.length

    const num1 = treeLargestBasins[treeLargestBasinsLength - 1]
    const num2 = treeLargestBasins[treeLargestBasinsLength - 2]
    const num3 = treeLargestBasins[treeLargestBasinsLength - 3]

    console.log(num1 * num2 * num3)
} catch(e) {
    console.log('Error:', e.stack);
}

