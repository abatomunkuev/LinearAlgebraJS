const { Vector, exp, dividedByVector } = require('./Vector.js')

function test2DVectors() {
    // 2D Vectors
    const vectorA = new Vector([1,2]);
    const vectorB = new Vector([2,4])

    // Performing addition and subtraction
    console.log("Addition of vector A and vector B: ");
    console.log(vectorA.add(vectorB))
    console.log("Subtraction of vector B from vector A: ")
    console.log(vectorA.subtract(vectorB))
    console.log()

    // Performing scaling
    console.log("Scaling")
    console.log(vectorA)
    console.log(vectorA.scaleBy(2))
    console.log(vectorA.scaleBy(0.5))
    console.log(vectorA.scaleBy(-2))
    console.log()

    // Calculating the length
    console.log("Length")
    console.log(vectorB.length())
    console.log()

    // Calculating dot product
    console.log("Dot product")
    console.log(vectorB.dotProduct(vectorA))

    // Normalizing vector
    console.log("Normalizing vector")
    console.log(vectorB)
    console.log(vectorB.normalize())

    // Checking for the same direction 
    console.log("Same direction check")
    console.log(vectorA.haveSameDirectionsWith(vectorB))
    console.log()

    // Checking for the opposite direction
    console.log("Opposite direction check")
    const vectorC = new Vector([-4, -8])
    console.log(vectorB.haveOppositeDirectionsWith(vectorC))
    console.log()

    // Checking for the perpendicularity 
    console.log("Perpendicularity check")
    const vectorD = new Vector([-2, 2])
    const vectorF = new Vector([2, 2])
    console.log(vectorD.isPerpendicularTo(vectorF))
    console.log()


    // Calculating the angle between vectors
    const vectorG = new Vector([0, 4])
    const vectorH = new Vector([4, 4])
    console.log("Angle between vectors")
    console.log(vectorG.angleBetween(vectorH))
    console.log()

    // Negating the vector
    console.log("Negate")
    console.log(vectorH)
    console.log(vectorH.negate())
    console.log()

    // Project on
    const vectorI = new Vector([8, 4])
    const vectorK = new Vector([4, 7])
    console.log("Project on")
    console.log(vectorK.projectOn(vectorI))
    console.log()

    // Setting new length
    const vectorL = new Vector([2,3])
    console.log("Setting new vector")
    console.log(vectorL.length())
    const modifiedVectorL = vectorL.withLength(10)
    console.log(modifiedVectorL.length())
}


function test3DVectors() {
    const vectorA = new Vector([2, 1, 1])
    const vectorB = new Vector([1, 2, 2])

    console.log("Cross product")
    console.log(vectorA.crossProduct(vectorB))
    console.log(vectorB.crossProduct(vectorA))
}


//test2DVectors()


function testMin() {
    const vectorG = new Vector([-22,45,-6,-21, 4,4,6,78,3,6,95,15,7,93,4,7,9,96,5,2,6,7,8,323,-34,3,5,6,34,31,20,246,35,7]);
    console.log(vectorG.min())
}

function testMax() {
    const vectorG = new Vector([-22,45,-6,-21, 4,4,6,78,3,6,95,15,7,93,4,7,9,96,5,2,6,7,8,323,-34,3,5,6,34,31,20,246,35,7]);
    console.log(vectorG.max())
}

function testExp() {
    const vectorG = new Vector([-22,45,-6,-21, 4,4,6,78,3,6,95,15,7,93,4,7,9,96,5,2,6,7,8,323,-34,3,5,6,34,31,20,246,35,7]);
    console.log(exp(vectorG))
}

function testAdd() {
    const vectorA = new Vector([1,2,3,4]);
    console.log(vectorA.addNumber(10))
}

//testExp()
//testAdd()



function logistic_transform(values) {
    return dividedByVector(1, (exp(values.negate()).addNumber(1)))
}

const vectorA = new Vector([-20, 0, 0.5, 80, -1]);
const values  = logistic_transform(vectorA);
console.log(values);


function testPower() {
    const vector = new Vector([0, 1, 2, 3, 4]);
    console.log(vector.power(2))
}

//testPower()

function rmse(target, predictions) {
    return (target.subtract(predictions).power(2).mean())**0.5
}

const target = new Vector([0.9, 1.2, 1.4, 1.5, 1.9, 2.0])
const predictions = new Vector([1.0, 1.2, 1.4, 1.6, 1.8, 2.0])
console.log(rmse(target,predictions))


function testArgSort() {
    const vector = new Vector([2, 1,  4, 5, 4, 11, 9]);
    const indices = vector.argSort()[0];
    const best = vector.components[indices]
    console.log(best)
}

testArgSort()

//const someTest = new Vector([1,2,3,4,5,6,7,8,9]);