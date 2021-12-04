var fs = require('fs');

try {  
    var data = fs.readFileSync('inputNumber.txt', 'utf8');
    var dataMat = fs.readFileSync('inputMat.txt', 'utf8');

    const numberArr = data.split(',').map(el => Number(el))

    const arrMat = dataMat.split('\n\n')

    const matrixArr = arrMat.map(mat => {
      const matrixData = mat.split('\n')

      return matrixData.map(rowData => {
        const rowStringData = rowData.split(/(\s+)/).filter(e => e.trim().length > 0)

        return rowStringData.map(singleStrNumber => Number(singleStrNumber))
      })
    })

    const coordByNumber = {}
    const preparedMatrix = []

    matrixArr.forEach((matrixData, matrixIndex) => {
      const preparedSingleMatrix = {
        rows: [],
        cols: [],
      }

      matrixData.forEach((rowData, rowIndex) => {
        rowData.forEach((num, colIndex) => {
          const numCoord = {
            row: rowIndex,
            col: colIndex,
          }

          if (coordByNumber[num] === undefined) {
            coordByNumber[num] = {}
          }

          if (coordByNumber[num][matrixIndex] == undefined) {
            coordByNumber[num][matrixIndex] = []
          }

          coordByNumber[num][matrixIndex].push(numCoord)

          if (preparedSingleMatrix.cols[colIndex] === undefined) {
            preparedSingleMatrix.cols[colIndex] = []
          }

          preparedSingleMatrix.cols[colIndex][rowIndex] = num
        })

        preparedSingleMatrix.rows.push(rowData)
      })

      preparedMatrix.push(preparedSingleMatrix)
    })

    let pep

    const countFinal = (num, matrix) => {
      const sumMatrix = matrix.reduce((acc, rowData) => {
        rowData.forEach(el => {
          acc += el
        })

        return acc
      }, 0)
      console.log(sumMatrix)
      console.log(sumMatrix * num)
      return sumMatrix * num
    }

    const removeNumberFromMatrix = (num) => {
      const coords = coordByNumber[num]

      if (!coords) {
        return
      }

      Object.keys(coords).forEach(matrixIndex => {
        if (pep !== undefined) {
          return
        }
        const matrixData = preparedMatrix[matrixIndex]
        const coordsInsideMatrix = coords[matrixIndex]
      
        coordsInsideMatrix.forEach(coordsData => {
          const {row, col} = coordsData

          const rowWithoutNum = matrixData.rows[row].filter(rowNum => rowNum !== num)
          const colWithoutNum = matrixData.cols[col].filter(colNum => colNum !== num)

          matrixData.rows[row] = rowWithoutNum
          matrixData.cols[col] = colWithoutNum

          if (rowWithoutNum.length === 0) {
            pep = countFinal(num, matrixData.rows)
            console.log(matrixData.rows)
            console.log('rows')
            return
          }
          if (colWithoutNum.length === 0) {
            pep = countFinal(num, matrixData.cols)
            console.log(matrixData.cols)
            console.log('cols')
            return
          }
        })
      })
    }

    


    numberArr.forEach(delNum => removeNumberFromMatrix(delNum))

    console.log(pep)
} catch(e) {
    console.log('Error:', e.stack);
}

