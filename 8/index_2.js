var fs = require('fs');

const validLength = [2, 3, 4, 7]

const getAlphabetStr = (str) => {
  const strArr = str.split('')

  strArr.sort((a, b) => a.localeCompare(b))

  return strArr.join('')
}

const isStrIncludessymbolFromStr = (str1, str2) => {
  let isIncl = true

  str2.split('').forEach(symb => {
    if (!isIncl) {
      return
    }
    if (!str1.includes(symb)) {
      isIncl = false
    }
  })

  return isIncl
}

const getUniqueSymbolsFromTwoStrInAlphabet = (str1, str2) => {
  let uniqueStr = []

  str1.split('').forEach(symbl => {
    if (!str2.includes(symbl)) {
      uniqueStr.push(symbl)
    }
  })

  str2.split('').forEach(symbl => {
    if (!str1.includes(symbl)) {
      uniqueStr.push(symbl)
    }
  })

  uniqueStr.sort((a, b) => a.localeCompare(b))

  return uniqueStr.join('')
}
const getCoordsHashmap = (str) => {
  const wordsByStrLength = {}

  str.split(' ').forEach(word => {
    const wordLength = word.length

    if (!wordsByStrLength[wordLength]) {
      wordsByStrLength[wordLength] = []
    }

    wordsByStrLength[wordLength].push(word)
  })

  const oneNumString = wordsByStrLength['2'][0]

  let fIndex
  let cIndex
  let abdIndex = getUniqueSymbolsFromTwoStrInAlphabet(wordsByStrLength['4'][0], wordsByStrLength['3'][0])

  wordsByStrLength['6'].forEach(str => {
    if (fIndex && cIndex) {
      return
    }

    if (str.includes(oneNumString[0]) && str.includes(oneNumString[1])) {
      return
    }

    if (str.includes(oneNumString[0])) {
      cIndex = oneNumString[1]
      fIndex = oneNumString[0]
    } else {
      cIndex = oneNumString[0]
      fIndex = oneNumString[1]
    }
  })


  const numByAlphabetStr = Object.keys(wordsByStrLength).reduce((acc, strLength) => {
    const strLengthWords = wordsByStrLength[strLength]
    
    strLengthWords.forEach(str => {
      const strArr = str.split('')

      strArr.sort((a, b) => a.localeCompare(b))

      const strInAlphabet = strArr.join('')

      if (strLength == 2) {
        acc[strInAlphabet] = 1
        return
      }

      if (strLength == 3) {
        acc[strInAlphabet] = 7
        return
      }

      if (strLength == 4) {
        acc[strInAlphabet] = 4
        return
      }

      if (strLength == 5) {
        if (str.includes(fIndex) && str.includes(cIndex)) {
          acc[strInAlphabet] = 3
          return
        } else if (str.includes(fIndex)) {
          acc[strInAlphabet] = 5
          return
        } else {
          acc[strInAlphabet] = 2
          return
        }
        
      }

      if (strLength == 6) {
        const isIncludeAbdIndex = isStrIncludessymbolFromStr(strInAlphabet, abdIndex)

        if (isIncludeAbdIndex && str.includes(cIndex)) {
          acc[strInAlphabet] = 9
          return
        } else if (isIncludeAbdIndex) {
          acc[strInAlphabet] = 6
          return
        } else {
          acc[strInAlphabet] = 0
          return
        }
      }
    
      if (strLength == 7) {
        acc[strInAlphabet] = 8
        return
      }
    })

    return acc
  }, {})


  return numByAlphabetStr
}

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    let summ = 0

    arr.forEach(str => {
      const splitedStr = str.split(' | ')
      const numsData = splitedStr[0]
      const answerData = splitedStr[1]

      const coordsHashmap = getCoordsHashmap(numsData)

      const strNumber = answerData.split(' ').reduce((acc, str) => {
        const aplhabetStr = getAlphabetStr(str)
        
          acc += `${coordsHashmap[aplhabetStr]}`
        
          return acc
      }, '')

      summ += Number(strNumber)

    })

    console.log(summ)
} catch(e) {
    console.log('Error:', e.stack);
}

