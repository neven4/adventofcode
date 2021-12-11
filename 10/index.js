var fs = require('fs');


try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    const preparedArr = arr.map(row => row.split(''))

    let sum = 0

    preparedArr.forEach((rowData, rowIndex) => {
        rowData.forEach()

        
    })
    

    console.log(sum)
} catch(e) {
    console.log('Error:', e.stack);
}

