var fs = require('fs');

const validLength = [2, 3, 4, 7]

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    const usfulData = arr.map(str => {
        return str.split(' | ')[1]
    })

    const sum = usfulData.reduce((acc, el) => {
        el.split(' ').forEach(str => {
            if (validLength.includes(str.length)) {
                acc++
            }
        })

        return acc
    }, 0)

    console.log(sum)
} catch(e) {
    console.log('Error:', e.stack);
}

