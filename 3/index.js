var fs = require('fs');

const filterFunc = (arr, trackIndex) => {
  if (arr.length === 2) {
    console.log(arr)
    const zeroItem = Number(arr[0].slice(trackIndex, trackIndex + 1))
    const oneItem = Number(arr[1].slice(trackIndex, trackIndex + 1))
    
    zeroItem > oneItem ? console.log(arr[0]) : console.log(arr[1])

    return
  }

  let one = 0
  let zero = 0

  arr.forEach(numString => {
    const countNumStr = numString.slice(trackIndex, trackIndex + 1)

    // console.log(countNumStr === '0')
    // console.log(typeof countNumStr)

    countNumStr === '0' ? zero++ : one++
  })

  const filterBy = one >= zero ? '1' : '0'

  console.log(one, zero)
  console.log(trackIndex)

  const epp = arr.filter(numString => {
    const countNumStr = numString.slice(trackIndex, trackIndex + 1)

    if (countNumStr === filterBy) {
      return true
    } else {
      return false
    }
  })

  console.log(epp)

  filterFunc(epp, trackIndex + 1)
}

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')
    const kek = arr.reduce((acc, el) => {
      if (el[0] === '1') {
        acc+=1
      }
      
      return acc
    }, 0)
    console.log(kek)
    filterFunc(arr, 0)

} catch(e) {
    console.log('Error:', e.stack);
}

