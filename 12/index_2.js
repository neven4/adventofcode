var fs = require('fs');

function isLowerCase(str) {
    return str == str.toLowerCase() && str != str.toUpperCase();
}

const countPathByPointId = (pointId, pathObj) => {
    let mainPathCount = 0

    let stack = []

    const visPoint = {}

    stack.push({point: pointId, visitedPoints: visPoint})

    while (stack.length) {
        const popedData = stack.pop()
        let stackPoint = popedData.point
        let visitedPoints = popedData.visitedPoints
        
        let stackPointData = pathObj[stackPoint]

        const alreadyVisitedTwice = Object.keys(visitedPoints).reduce((acc, el) => {
            if (isLowerCase(el) && visitedPoints[el] === 2) {
                acc = true
            }

            return acc
        }, false)

        if (stackPointData.multi || (!stackPointData.multi && (!alreadyVisitedTwice || visitedPoints[stackPoint] === undefined))) {
            if (stackPoint === 'end') {
                mainPathCount++
            } else if (stackPoint !== 'start') {
                if (visitedPoints[stackPoint] === undefined) {
                    visitedPoints[stackPoint] = 0
                }

                let stackPointCount = visitedPoints[stackPoint]

                visitedPoints[stackPoint] = stackPointCount + 1

                stackPointData.connectedPoints.forEach(pointId => {
                    stack.push({point: pointId, visitedPoints: {...visitedPoints}})
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


