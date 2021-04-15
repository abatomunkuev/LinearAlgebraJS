const { Matrix, identity } = require('./Matrix')
const { Vector } = require('../Vectors/Vector.js');

const matrixA = new Matrix(
    [0, 1],
    [2, 3],
    [4, 5]
)
/*
console.log("Matrix")
console.log(matrixA)
console.log("Accessing elements ")
// Accessing elements in the matrix by first taking row by row index and then element by column index
console.log(matrixA.rows[1])
console.log(matrixA.rows[1][1])
*/


function linearCombination() {
    console.log("Linear combination")

    const i = new Vector([1, 0])
    const j = new Vector([0, 1])
    const firstCoef = 2;
    const secondCoef = 5;
    const linearCombination = i.scaleBy(firstCoef).add(j.scaleBy(secondCoef))
    console.log(linearCombination);
}

linearCombination();

function testColumns() {
    const matrixB = new Matrix(
        [1, 2 , 3],
        [4, 5, 6],
        [7, 8, 9]
    )
    
    console.log(matrixB.columns())
}


function testTransform() {
    const vector2D = new Vector(3, 5)
    const vector3D = new Vector(3, 5, 2)
    const matrix2x2D = new Matrix(
        [1, 2],
        [3, 4]
    )
    const matrix2x3D = new Matrix(
        [1, 2, 3],
        [4, 5, 6]
    )
    const matrix3x2D = new Matrix(
        [1, 2],
        [3, 4],
        [5, 6]
    )


    // 2D => 2D
    console.log(vector2D.transform(matrix2x2D))
    // 3D => 2D
    console.log(vector3D.transform(matrix2x3D))
    // 2D => 3D
    console.log(vector2D.transform(matrix3x2D))
    // Error
    console.log(vector2D.transform(matrix2x3D))
}

//testTransform()

function testAdditionSubtraction() {
    const MatrixA = new Matrix(
        [1, 2],
        [3, 4]
    )
    const MatrixB = new Matrix(
        [5, 6], 
        [7, 8]
    )

    console.log(MatrixA.add(MatrixB))
    console.log(MatrixB.subtract(MatrixA))
}
//testAdditionSubtraction()

function testScalarMatrixMultiplication() {
    const matrix = new Matrix(
        [2, 3],
        [4, 5]
    )
    console.log(matrix.scaleBy(2))
}

//testScalarMatrixMultiplication()

function testMatricesMultiplication() {
    const matrixA = new Matrix(
        [3, -4],
        [0, -3],
        [6, -2], 
        [-1 ,1]
    )

    const matrixB = new Matrix(
        [3, 2, -4],
        [4, -3, 5]
    )
    console.log()
    console.log(matrixA)
    console.log()
    console.log(matrixB)
    console.log()
    console.log(matrixA.multiply(matrixB))
}

//testMatricesMultiplication()


function testTranspose() {
    const matrixA = new Matrix(
        [0 , 1, 2],
        [3, 4, 5],
        [6, 7 ,8],
        [9 , 10 ,11]
    )
    console.log(matrixA.transpose())
}
//testTranspose()

function testDeterminant() {
    const matrixA = new Matrix(
        [0, 3],
        [-2, 1]
    )

    console.log(matrixA.determinant())


    const matrixB = new Matrix(
        [2, -3 ,1],
        [2, 0, -1],
        [1, 4, 5]
    )
    //console.log(matrixB.determinant())


    const matrixC = new Matrix(
        [3, 0, 2, -1],
        [1, 2, 0, -2],
        [4, 0, 6, -3],
        [5, 0, 2,  0]
    )
    // [ 2, 0, -2 ], [ 0, 6, -3 ], [ 0, 2, 0 ]
    // [ 1, 0, -2 ], [ 4, 6, -3 ], [ 5, 2, 0 ] 
    // [ 1, 2, -2 ], [ 4, 0, -3 ], [ 5, 0, 0 ] 
    // [ 1, 2, 0 ], [ 4, 0, 6 ], [ 5, 0, 2 ]

    //console.log(matrixC.determinant())
}

//testDeterminant()


function testMinor() {
    const matrix = new Matrix(
        [1 ,2 ,3],
        [4, 5 ,6],
        [7, 8 ,9]
    )

    console.log(matrix.minor(0, 1))
}

//testMinor()

function testCofactor() {
    const matrix = new Matrix(
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    )
    console.log(matrix.cofactor(0, 1))
}

//testCofactor()

function testAdjugate() {
    const matrix = new Matrix(
        [1, 2, 0],
        [0, 1, 2],
        [2, 0, 1]
    )

    console.log(matrix.adjugate())
}

//testAdjugate()


function testInverse() {
    const matrixC = new Matrix(
        [11, 4, 3, 9, 13],
        [7, 5, 6, 12, 8],
        [14, 10, 15, 16,17],
        [18, 19, 20, 2 ,21],
        [22, 23, 24, 25, 26]
    )
    console.log(matrixC.inverse())
}

//testInverse()


//console.log(matrix)

const matrixE = new Matrix(
    [2, 5, 7],
    [6, 3, 4],
    [5, -2, -3]
)

const matrixO = new Matrix(
    [2, 5, 7],
    [6, 3, 4],
    [5, -2, -3]
)
//console.log(matrixE.equalTo(matrixO))
//const newMatrixA = matrix.multiply(matrixE.multiply(matrixE.power(-1)));
//console.log(newMatrixA)

//console.log(matrixE.multiply())

//console.log(matrixE.power(-1))

//console.log(matrixE);


const matrixEA = identity(5);
//console.log(matrixEA);

const matrixC = new Matrix(
    [11, 4, 3, 9, 13],
    [7, 5, 6, 12, 8],
    [14, 10, 15, 16,17],
    [18, 19, 20, 2 ,21],
    [22, 23, 24, 25, 26]
)

const matrixTest = new Matrix(
    [1,1,2],
    [1,-2,-1],
    [2,1,1]
)
const vectorB = new Vector(
    [1,4,7]
)
console.log(matrixTest.gaussJordanElimination(vectorB))
const {matrix, vector} =  matrixTest.gaussJordanElimination(vectorB)
console.log(matrix)

/*
    [1 1 2]
    [1 -2 -1]
    [2 1 1]

    [1 1 2]
    [0 -3 -3]
    [0 -1  -2]
*/