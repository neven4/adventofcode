var fs = require('fs');

const openChars = ['{', '(', '[', '<']

const pointsByChar = {
    '}': 1197,
    ')': 3,
    ']': 57,
    '>': 25137,
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

    let sum = 0

    arr.forEach(rowStr => {
        const rowStrArr = rowStr.split('')

        let wrongChar

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

        if (wrongChar !== undefined) {
            sum += pointsByChar[wrongChar]
        }
    })
    

    console.log(sum)
} catch(e) {
    console.log('Error:', e.stack);
}

