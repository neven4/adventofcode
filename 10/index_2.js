var fs = require('fs');

const openChars = ['{', '(', '[', '<']

const pointsByChar = {
    '}': 3,
    ')': 1,
    ']': 2,
    '>': 4,
}

const closeCharByOpenChar = {
    '{': '}',
    '(': ')',
    '[': ']',
    '<': '>',
}

const openCharByCloseChar = {
  '}': '{',
  ')': '(',
  ']': '[',
  '>': '<',
}

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    const incompleteScoresArr = []

    arr.forEach(rowStr => {
        const rowStrArr = rowStr.split('')

        let wrongChar
        let summ = 0

        const openedCharArr = []

        rowStrArr.forEach(char => {
            if (wrongChar !== undefined) {
                return
            }

            if (openChars.includes(char)) {
                openedCharArr.push(char)
                return
            }

            if (openCharByCloseChar[char] === openedCharArr[openedCharArr.length - 1]) {
                openedCharArr.pop()
                return
            }

            wrongChar = char
        })

        if (wrongChar === undefined) {
          for (let i = openedCharArr.length - 1; i >= 0; i--) {
            let openChar = openedCharArr[i]

            let closedChar = closeCharByOpenChar[openChar]

            let closeCharScore = pointsByChar[closedChar]

            summ = summ * 5 + closeCharScore
          }

          incompleteScoresArr.push(summ)
        }

    })
    
    incompleteScoresArr.sort((a, b) => a - b)


    console.log(incompleteScoresArr[(incompleteScoresArr.length - 1) / 2])
} catch(e) {
    console.log('Error:', e.stack);
}

