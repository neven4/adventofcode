var fs = require('fs');

try {  
    let pep = 0
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    for (let i = 3; i < arr.length; i++) {

      const sum1 = Number(arr[i - 1]) + Number(arr[i - 2]) + Number(arr[i - 3])
      const sum2 = Number(arr[i]) + Number(arr[i - 1]) + Number(arr[i - 2])

      if (sum2 > sum1) {
        pep++
      }
    }

    console.log(pep)
} catch(e) {
    console.log('Error:', e.stack);
}