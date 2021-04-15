const { Vector } = require("../Vectors/Vector")

class Matrix {
    /**
     * https://geekrodion.medium.com/linear-algebra-linear-transformation-matrix-2f4befc3c27b
     * https://medium.com/swlh/linear-algebra-basic-matrix-operations-13a019633c15
     * 
     * A matrix is a rectangular array of real numbers with m rows and n columns.
     * Example:
     *             | A11  A12 |
     * Matrix A =  | A21  A22 |
     *             | A31  A32 |
     */

    constructor(...rows) {
        /**
         * @param {Array} rows 
         */
        this.rows = rows
    }

    // Utility methods
    _sum(arr) {
        /**
         * @param {Array} column array
         * @param {Array} components - newComponents 
         */
        return arr.reduce((acc, value) => acc + value, 0)
    }

    _withoutElementAtIndex(arr, index) {
        /**
         * @param {Array} arr - array
         * @param {Number} index
         * Method removes i-th row and j-th column
         */
        const sliced_arr = [...arr.slice(0,index), ...arr.slice(index + 1)]   
        return sliced_arr
    }

    _map(func) {
        /**
         * @param {Function} func
         * @return {Matrix} - matrix
         * Method is part of the adjugate method.
         * The adjugate matrix is defined as the transpose of the matrix of cofactors C.
         * The matrix of cofactors is a matrix of the same dimensions as the original matrix A that is constructed 
         * by replacing each entry Aij by its cofactor Cij
         */
        return new Matrix(
            ...this.rows.map((row, i) => {
                return row.map((element,j) => func(element, i, j))
            })
        )
    }
    // Utility methods
    _areEqual(one, other, epsilon) {
        /**
         * @param {Number} one float number
         * @param {Number} other float number
         * @param {Number} epsilon - accuracy
         * @return {Boolean} true or false
         * Function that compares two float numbers
         */
        const EPSILON = 0.00000001;
        epsilon = epsilon ? epsilon : EPSILON;
        return Math.abs(one - other) < epsilon;
    }

    /**
     * Matrix Vector Product
     * 
     * 
     *     | A11  A12 |  | X1 |    | X1A11 + X2A12 |       | A11 |      | A21 |
     * y = | A21  A22 |  | X2 |  = | X1A21 + X2A22 | =  X1 | A21 | + X2 | A22 |
     *     | A31  A32 |  |____|    | X1A31 + X2A32 |       | A31 |      | A33 |
     * 
     * 
     */

     columns() {
         /**
          * @return columns of the matrix
          */
        return this.rows[0].map((_, i) => this.rows.map((row) => row[i]))
    }

    componentWiseOperation(func, { rows }) {
        /**
         * @param {Function} func - operation to do i.e add or subtract
         * @param {Matrix} rows - rows of the matrix
         * @return {Matrix} new resulting matrix of performed operations
         * High order function that performs either addition or subtraction
         */
        const newRows = rows.map((row, i) => row.map((element, j) => func(this.rows[i][j], element)))
        return new Matrix(...newRows)
    }

    add(other) {
        /**
         * @param {Matrix} other - matrix
         * @return {Matrix} new resulting addition matrix
         * Method performs Matrix-Matrix addition
         */
        if(this.rows.length !== other.rows.length || this.row[0].length !== other.rows[0].length) {
            throw new Error('Matrices must be the same sizes')
        }
        return this.componentWiseOperation((a,b) => a + b, other)
    }

    subtract(other) {
       /**
         * @param {Matrix} other - matrix
         * @return {Matrix} new resulting subtraction matrix
         * Method performs Matrix-Matrix subtraction
         */
        if(this.rows.length !== other.rows.length || this.row[0].length !== other.rows[0].length) {
            throw new Error('Matrices must be the same sizes')
        } 
        return this.componentWiseOperation((a,b) => a - b, other)
    }

    scaleBy(number) {
        /**
         * @param {Number} number - number by which we scale the vector
         * @return {Matrix} - return new Matrix with all components multiplied by a number passed as parameter
         * Method performs Scalar-Matrix multiplication
         */
        const newRows = this.rows.map((row) => row.map(element => element * number))
        return new Matrix(...newRows)
    }

    multiply(other) {
        /**
         * @param {Matrix} other - matrix
         * @return {Matrix} multiplied matrix
         * Method performs Matrix-Matrix multiplication.
         * 
         * The matrix product AB of matrices consists of computing the dot product between each row of A and each column B
         * 
         * Example:
         * 
         *    
         *      | A11 A12 | | B11 B12 |    | A11B11 + A12B21   A11B12 + A12B22 |
         * AB = | A21 A22 | | B21 B22 |  = | A21B11 + A22B21   A21B12 + A22B22 |
         *      | A31 A32 | |_________|    | A31B11 + A32B21   A31B12 + A32B22 |
         * 
         */
        if (this.rows[0].length !== other.rows.length) {
            throw new Error('The number of columns of this matrix is not equal to the number of rows of the given matrix')
        }
        const columns = other.columns();
        const newRows = this.rows.map((row) => columns.map(column => this._sum(row.map((element, i) => element * column[i]))))
        return new Matrix(...newRows)
    }

    transpose() {
        /**
         * @return {Matrix} transposed matrix
         * Method transposes the matrix
         * Wiki: Transpose of a matrix is an operator which flips a matrix over its diagonal.
         * It switches the row and column indices of the matrix.
         */
        
        return new Matrix(...this.columns())
    }

    determinant() {
        /**
         * @return {Number} determinant
         * Method calculates the determinant of the matrix.
         * The determinant describes the relative geometry of the vectors that make up the rows of the matrix.
         * The determinant of matrix tells the volume of a box with sides given by rows.
         * 
         * Example 2x2 matrix:
         *           | a  b |
         * matrixA = | c  d | = ad - bc
         * 
         * 
         * 3x3 matrix: 
         * 
         *           | a b c |       | e f |       | d f |       | d e |
         * matrixB = | d e f | = a * | h i | - b * | g i | + c * | g h | 
         *           | g h i |
         * 
         */
        if(this.rows.length !== this.rows[0].length) {
            throw new Error('Only matrices with the same number of rows and columns supported!')
        }
        if (this.rows.length === 2) {
            return this.rows[0][0] * this.rows[1][1] - this.rows[0][1] * this.rows[1][0] 
        }

        const parts = this.rows[0].map((coef, index) => {
            const matrixRows = this.rows.slice(1).map(row => [...row.slice(0,index), ...row.slice(index+1)])
            const matrix = new Matrix(...matrixRows)
            const result = coef * matrix.determinant()
            return index % 2 === 0 ? result : -result
        })

        return this._sum(parts)
    }

    minor(i,j) {
        /**
         * @param {Number} i - index i - column index of the matrix to remove
         * @param {Number} j - index j - row index of the matrix to remove
         * @return {Number} minor
         * Method finds the minor. Minor is the determinant of the matrix that remains after
         * we remove the i-th row and j-th column of a given matrix.
         */
        const newRows = this._withoutElementAtIndex(this.rows, i).map(row => this._withoutElementAtIndex(row, j))
        const matrix = new Matrix(...newRows)
        if(matrix.rows.length === 1) {
            return matrix.rows[0][0]
        }
        return matrix.determinant()
    }

    cofactor(i, j) {
        /**
         * @param {Number} i - index i - column index of the matrix to remove
         * @param {Number} j - index j - row index of the matrix to remove
         * Method calculates the cofactor of the matrix
         * The Math.pow() function returns the base to the exponent power, that is, base^exponent.
         */
        const sign = Math.pow(-1, i + j)
        const minor = this.minor(i, j)
        return sign * minor;
    }   


    adjugate() {
        /**
         * @return {Matrix} - matrix
         * Methods forms adjugate matrix or adjoint of square matrix.
         * The adjugate matrix is defined as the transpose of the matrix of cofactors C.
         * The matrix of cofactors is a matrix of the same dimensions as the original matrix A that is constructed 
         * by replacing each entry Aij by its cofactor Cij
         */
        return this._map((_, i, j) => this.cofactor(i, j)).transpose()
    }

    inverse() {
        /**
         * @return {Matrix} inverse matrix
         * Methods forms inverse matrix
         * http://people.math.harvard.edu/~elkies/M21b.06/det.html
         * The determinant of a square matrix A detects whether A is invertible: 
         * If det(A)=0 then A is not invertible (equivalently, the rows of A are linearly dependent; equivalently, the columns of A are linearly dependent); 
         * If det(A) is not zero then A is invertible (equivalently, the rows of A are linearly independent; equivalently, the columns of A are linearly independent). 
         */
        const determinant = this.determinant();
        if (determinant === 0) {
            throw new Error("Determinant = 0, matrix is not invertible")
        }
        const adjugate = this.adjugate()
        return adjugate.scaleBy(1 / determinant)
    }

    power(exponent) {
        /**
         * @param {Number} - exponent
         * @return {Matrix} - return new Matrix with all components with exponent, number passed as parameter
         * Method performs matrix exponentiation.
         */
        const newRows = this.rows.map((row) => row.map(element => element ** exponent))
        return new Matrix(...newRows)
    }

    equalTo({rows}) {
        /** 
         * @param {Array} rows - matrix
         * @returns {Boolean} true or false.
         * Methods checks if two matrices are equal to each other. If matrices are equal returns true. Otherwise, false.
         * The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
        */
       let isEqual = false;
        if(this.rows.length === rows.length && this.rows[0].length === rows[0].length) {
            isEqual = rows.every((row, indexRow) => row.every((element, indexCol) => this._areEqual(element, this.rows[indexRow][indexCol])));
        }
        return isEqual;
    }

    gaussJordanElimination(vector) {
        /**
         * @return {Matrix} - matrix
         * 
         * -------UNDER DEVELOPMENT--------
         */
        let matrix = new Matrix(...this.rows);
        let vector1 = new Vector(vector.components)
        if (this.determinant() === 0) {
            throw new Error('Matrix is not invertible')
        }
        for (let i = 0; i < matrix.rows[0].length; i++) {
            for (let j = i+1; j < matrix.rows.length; j++) {
                let k = matrix.rows[j][i] / matrix.rows[i][i]
                console.log(`k = ${k}`);
                const row = new Vector(matrix.rows[i])
                const row2 = new Vector(matrix.rows[j])
                const newRow = row2.subtract(row.scaleBy(k))
                matrix.rows[j] = newRow.components
                vector1.components[j] = vector1.components[j] - vector1.components[i] * k
            }
        }
        /*
        let X = []
        console.log(vector1.components.length)
        for(let i= matrix.rows.length - 1;i > -1; i--) {
            console.log(`i = ${i} -- ${matrix.rows[i][matrix.rows.length]}`)
            X.push(matrix.rows[i][matrix.rows.length] / matrix.rows[i][i])
        }
        */
        //console.log(X)
        return {matrix, vector};
    }
}

function identity(n) {
    /**
     * @param {Number} n - dimension
     * @return {Matrix} identity matrix
     * Method builds identity matrix (unit matrix)
     * The identity matrix (sometimes ambiguously called a unit matrix) of size n is the n × n square matrix with ones on the main diagonal and zeros elsewhere.
     */
    let array = Array.apply(null, new Array(n));
    let newArray = array.map((row, i) => array.map((col, j) => i === j ? 1 : 0))
    return new Matrix(...newArray);
}


module.exports = {
    Matrix, identity
}