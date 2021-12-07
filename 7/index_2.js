var fs = require('fs');

function summize(num) {
    if (num == 0) 
        return 0;
    else {
        return (num + summize(num - 1));
    }
}

try {
  var data = fs.readFileSync('input.txt', 'utf8');
  const arr = data.split(',')

  const getMeanNumber = () => {
    const summ = arr.reduce((acc, num) => {return acc + Number(num)}, 0)
    console.log(summ / arr.length)
    return summ / arr.length
  }

  const mean = getMeanNumber()

  const floorMean = Math.floor(mean)
  const ceilMean = Math.ceil(mean)

  let floorMeanFuelCount = 0
  let ceilMeanFuelCount = 0

  arr.forEach(num => {
    const numberedNum = Number(num)
    const floorDiff = Math.abs(numberedNum - floorMean)
    const ceilDiff = Math.abs(numberedNum - ceilMean)

    floorMeanFuelCount += summize(floorDiff)
    ceilMeanFuelCount += summize(ceilDiff)
  })

  if (floorMeanFuelCount > ceilMeanFuelCount) {
    console.log(ceilMeanFuelCount)
  } else {
    console.log(floorMeanFuelCount)
  }
} catch(e) {
  console.log('Error:', e.stack);
}
  
  