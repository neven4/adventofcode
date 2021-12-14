var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n\n')

    let polymerTemplate = arr[0].split('')

    const pairInsertion = arr[1].split('\n').reduce((acc, pair) => {
        const pairArr = pair.split(' -> ')

        acc[pairArr[0]] = pairArr[1]

        return acc
    }, {})

    let polymersCountByPairId = new Map()

    const addElToPolymersCountById = (pairId, count) => {
        let pairData = polymersCountByPairId.get(pairId) || 0

        polymersCountByPairId.set(pairId, pairData + 1)
    }

    for (let i = 0; i < polymerTemplate.length; i++) {
        

        if (polymerTemplate[i + 1] === undefined) {
            break
        }

        let pair = `${polymerTemplate[i]}${polymerTemplate[i + 1]}`

        addElToPolymersCountById(pair)
    }

    for (let step = 0; step < 40; step++) {
        let newPolymersCountByPairId = new Map()

        polymersCountByPairId.forEach((value, key) => {
            const newPlymer = pairInsertion[key]
            const splitedPair = key.split('')

            const pair1 = `${splitedPair[0]}${newPlymer}`
            const pair2 = `${newPlymer}${splitedPair[1]}`

            let pair1Data = newPolymersCountByPairId.get(pair1) || 0
            let pair2Data = newPolymersCountByPairId.get(pair2) || 0

            newPolymersCountByPairId.set(pair1, pair1Data + value)
            newPolymersCountByPairId.set(pair2, pair2Data + value)
        })

        polymersCountByPairId = newPolymersCountByPairId
    }

    const result1 = new Map();
    const result2 = new Map();

    polymersCountByPairId.forEach((value, key) => {
        const firstItem = key[0]
        const secondItem = key[1]
        const firstItemData = result1.get(firstItem) || 0
        const secondItemData = result2.get(secondItem) || 0
        
        result1.set(firstItem, firstItemData + value)
        result2.set(secondItem, secondItemData + value)
    })

    const final = new Map()

    for (const key of result1.keys()) {
        final.set(key, Math.max(result1.get(key), result2.get(key)));
    }

    console.log(final.get('O') - final.get('V'))
} catch(e) {
    console.log('Error:', e.stack);
}

