const { Vector, Matrix } = require('./linearAlgebra');

const vectorA = new Vector([1,2,3,5,6,8,97,5])
const vectorB = new Vector([12,45,6,86,5,3,1,5])
const matrixA = new Matrix(
    []
)

console.log(vectorA.add(vectorB))