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

    let polymersCountById = {}

    const addElToPolymersCountById = (polimer) => {
        if (polymersCountById[polimer] === undefined) {
            polymersCountById[polimer] = 0
        }

        polymersCountById[polimer]++
    }

    polymerTemplate.forEach(addElToPolymersCountById)

    

    for (let i = 0; i < 10; i++) {
        let templateLength = polymerTemplate.length

        let k = 0

        while (k < templateLength) {
            if (polymerTemplate[k + 1] === undefined) {
                break
            }

            const elem1 = polymerTemplate[k]
            const elem2 = polymerTemplate[k + 1]

            let newElement = pairInsertion[`${elem1}${elem2}`]

            polymerTemplate.splice(k + 1, 0, newElement)

            addElToPolymersCountById(newElement)

            k += 2
            templateLength++
        }
    }

    const sortedPolimers = Object.keys(polymersCountById).sort((a, b) => polymersCountById[a] - polymersCountById[b])
    
    const highPolimer = polymersCountById[sortedPolimers[sortedPolimers.length - 1]]
    const lowPolimer = polymersCountById[sortedPolimers[0]]

    console.log(polymersCountById)
} catch(e) {
    console.log('Error:', e.stack);
}



