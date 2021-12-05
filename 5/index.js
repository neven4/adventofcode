var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')
    const preparedCoords = arr.map(item => {
        const coordsArr = item.split(' -> ')

        return coordsArr.map(coordData => coordData.split(','))
    })

    const overlapByCoord = {}

    const setCoordData = (coordStr) => {
        if (overlapByCoord[coordStr] === undefined) {
            overlapByCoord[coordStr] = 0
        }

        overlapByCoord[coordStr] = overlapByCoord[coordStr] + 1
    }

    preparedCoords.forEach(lineData => {
        const x1 = Number(lineData[0][0])
        const y1 = Number(lineData[0][1])
        const x2 = Number(lineData[1][0])
        const y2 = Number(lineData[1][1])

        if (x1 === x2 && y1 === y2) {
            const coordData = `${x1}_${y1}`

            setCoordData(coordData)
        } else if (x1 === x2) {
            const countData = y2 > y1 ? {from: y1, to: y2} : {from: y2, to: y1}
            

            for (let i = countData.from; i <= countData.to; i++) {
                const coordData = `${x1}_${i}`

                setCoordData(coordData)
            }
        } else if (y1 === y2) {
            const countData = x2 > x1 ? {from: x1, to: x2} : {from: x2, to: x1}

            for (let k = countData.from; k <= countData.to; k++) {
                const coordData = `${k}_${y1}`

                setCoordData(coordData)
            }
        }
    })
    _ _ _
    _ _ _
    _ _ _

    const overlapCount = Object.keys(overlapByCoord).reduce((acc, coordData) => {
        const overlapData = overlapByCoord[coordData]
        if (overlapData >= 2) {
            acc += 1
        }
        return acc
    }, 0)

    console.log(overlapCount)
} catch(e) {
    console.log('Error:', e.stack);
}

