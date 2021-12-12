var fs = require('fs');

function isLowerCase(str) {
    return str == str.toLowerCase() && str != str.toUpperCase();
}

const countPathByPointId = (pointId, pathObj) => {
    let mainPathCount = 0

    let stack = []

    const visPoint = new Set()

    stack.push({point: pointId, visitedPoints: visPoint})

    while (stack.length) {
        const popedData = stack.pop()
        let stackPoint = popedData.point
        let visitedPoints = popedData.visitedPoints
        
        let stackPointData = pathObj[stackPoint]

        if (stackPointData.multi || (!stackPointData.multi && !visitedPoints.has(stackPoint))) {
    
            if (stackPoint === 'end') {
                mainPathCount++
            } else if (stackPoint !== 'start') {
                stackPointData.connectedPoints.forEach(pointId => {
                    visitedPoints.add(stackPoint)

                    stack.push({point: pointId, visitedPoints: new Set(visitedPoints)})
                })
            }
        }
    }

    return mainPathCount
}

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    const arr = data.split('\n')

    const pathObj = {}

    arr.forEach(pathData => {
        const pathArr = pathData.split('-')
        const pointA = pathArr[0]
        const pointB = pathArr[1]

        if (pathObj[pointA] === undefined) {
            const multi = isLowerCase(pointA)

            pathObj[pointA] = {
                multi: !multi,
                connectedPoints: []
            }
        }

        if (pathObj[pointB] === undefined) {
            const multi = isLowerCase(pointB)

            pathObj[pointB] = {
                multi: !multi,
                connectedPoints: []
            }
        }

        if (!pathObj[pointA].connectedPoints.includes(pointB)) {
            pathObj[pointA].connectedPoints.push(pointB)
        }

        if (!pathObj[pointB].connectedPoints.includes(pointA)) {
            pathObj[pointB].connectedPoints.push(pointA)
        }
    })

    let mainPathCount = 0

    const startData = pathObj['start']

    startData.connectedPoints.forEach(pointId => {
        mainPathCount += countPathByPointId(pointId, pathObj)
    })

    console.log(mainPathCount)
} catch(e) {
    console.log('Error:', e.stack);
}


