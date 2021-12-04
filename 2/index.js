var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')
    let horiz = 0
    let vert = 0
    let depth = 0

    arr.forEach(directionData => {
      const directionArr = directionData.split(' ')
// console.log(directionArr)
      const value =  Number(directionArr[1])

      switch (directionArr[0]) {
        case 'forward':
          horiz += value
          depth = (vert * value) + depth
          break
        case 'down':
          vert += value
          break
        case 'up':
          vert -= value
          break
      }
    })

    console.log(horiz * depth)
} catch(e) {
    console.log('Error:', e.stack);
}