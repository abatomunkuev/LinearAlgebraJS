class Vector {
    /**
     * Vectors are precise way to describe directions in space
     * They are built from numbers, which form the components of the vector
     * https://geekrodion.medium.com/linear-algebra-vectors-f7610e9a0f23
     * @param  {Array} components 
     */
    constructor(components) {
        /** 
         * @param {Array} components - numbers which form the components of the nD vector
         * 
        */
        if(!(components instanceof Array)) {
            throw new Error('Invalid vector creation, please provide Array in arguments list')
        }
        this.components = components
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

    _toDegrees(radians) {
        /**
         * @param {Number} radians
         * @return {Number} degrees
         * Function converts radians to degrees
         */
        return (radians * 180) / Math.PI
    }

    _toRadians(degrees) {
        /**
         * @param {Number} degrees
         * @return {Number} radians
         * Function converts degrees to radians
         */
        return (degrees * Math.Pi) / 180
    }

    _sum(arr) {
        /**
         * @param {Array} column array
         * @param {Array} components - newComponents 
         */
        return arr.reduce((acc, value) => acc + value, 0)
    }

    _forLoopMinMax() {
        let min = this.components[0], max = this.components[0];
        for (let i = 1; i < this.components.length; i++) {
            let value = this.components[i];
            min = (value < min) ? value : min;
            max = (value > max) ? value : max;
        }

        return [min,max]
    }

    // Main methods

    add({components}) {
        /**
         * @param {Array} components - vector
         * @return {Vector} - return new Vector built from sums of corresponding components
         * Method performs an addition of 2 vectors 
         * 
         * Formula 2D Vector: VectorA + VectorB = (VectorAx + VectorBx, VectorAy + VectorBy)
         */
        if(this.components.length !== components.length) {
            throw new Error('Vectors should be the same size!')
        }
        return new Vector([
            ...components.map((component, index) => this.components[index] + component)
        ])
    }

    subtract({components}) {
        /**
         * @param {Array} components - vector
         * @return {Vector} - return new Vector built from difference of corresponding components
         * Method performs an subtraction of 2 vectors 
         * 
         * Formula 2D Vector: VectorA - VectorB = (VectorAx - VectorBx, VectorAy - VectorBy)
         */
        if(this.components.length !== components.length) {
            throw new Error('Vectors should be the same size!')
        }
        return new Vector([
            ...components.map((component, index) => this.components[index] - component)
        ])
    }

    addNumber(number) {
        /**
         * @param {Number} number to add
         * @return {Vector} - return new Vector built from the sums of vector components and number from the parameters
         * Method performs addition of vector and number
         */
        return new Vector([
            ...this.components.map((component) => component + number)
        ])
    }

    subtractNumber(number) {
        /**
         * @param {Number} number to subtract
         * @return {Vector} - return new Vector built from difference of vector components and number from the parameters
         * Method performs subtraction of vector and number
         */
        return new Vector([
            ...this.components.map((component) => component - number)
        ])
    }

    scaleBy(number) {
        /**
         * @param {Number} number - number by which we scale the vector
         * @return {Vector} - return new Vector with all components multiplied by a number passed as a parameter
         * Method performs scaling on vector by the number. Each component of the vector
         * gets multiplied by the parameter number. 
         * 
         * Formula 2D Vector: VectorA * number = (VectorAx * number, VectorAy * number)
         * 
         * Conditions:
         * 1. if number > 1, then vector will get longer 
         * 2. if 0 <= number < 1, then vector will become shorter
         * 3. if number < 0 i.e number is negative, then scaled vector will point to the opposite direction 
         */
        return new Vector([
            ...this.components.map((component) => component * number)
        ])
    }

    divideBy(number) {
        /**
         * @param {Number} number - number by which we divide the components of the vector
         * @return {Vector} - return new Vector with all components divided by a number passed as a parameter
         */
        return this.scaleBy(1 / number)
    }

    length() {
        /**
         * @return {Number} length of the vector
         * Method calculates the length of the vector. Vector length gets obtained from Pythagoras theorem. 
         * We will use Math.hypot
         * The Math.hypot() function returns the square root of the sum of squares of its arguments. √∑(vi)^2 = √(v1^2 + v2^2 + v3^2...+vn^2)
         * 
         * Symbol that represents the length of the vector A - ||VectorA|| 
         */
        return Math.hypot(...this.components)
    }

    dotProduct({components}) {
        /**
         * @param {Array} components - vector
         * @return {Number} dotProduct
         * Method finds the dot product between 2 vectors
         * The dot product tells us how similar two vectors are to each other. The dot product between two vectors is the sum of the products of 
         * corresponding components
         * 
         * Formula 2D Vector: VectorA * VectorB = VectorAx * VectorBx + VectorAy * VectorBy
         */
        if(this.components.length !== components.length) {
            throw new Error('Vectors should be the same size!')
        }
        return components.reduce((acc, component, index) => acc + component * this.components[index], 0)
    }

    normalize() {
        /**
         * @return {Vector} normalized vector aka unit vector - a vector with a length equal to 1. 
         * Method performs a vector normalization.
         * Normalized vectors are useful in many contexts. For example, when we want to specify a direction in a space,
         * we use a normalized vector in that direction. 
         * 
         * Formula: NormalizedVector = non-zero Vector / length of the vector
         */
        return this.scaleBy(1 / this.length())
    }

    
    haveSameDirectionsWith(other) {
        /**
         * @param {Vector} other - vector
         * @returns {Boolean} true if two vectors point to the same directions, otherwise false
         * Method checks if two vectors have the same direction
         */
        // We take dot product of two vectors. The result is equal to 1, it means that 2 vectors have the same direction
        const dotProduct = this.normalize().dotProduct(other.normalize())
        return this._areEqual(dotProduct, 1)
    }

    haveOppositeDirectionsWith(other) {
       /**
         * @param {Vector} other - vector
         * @returns {Boolean} true if two vectors have opposite directions, otherwise false
         * Method checks if two vectors have opposite directions
         */ 
        // We also take dot product of two vectors. The result is equal to -1, it means that 2 vectors have the opposite direction
        const dotProduct = this.normalize().dotProduct(other.normalize())
        return this._areEqual(dotProduct, -1)
    }

    isPerpendicularTo(other) {
        /**
         * @param {Vector} other - vector
         * @returns {Boolean} true if two vectors are perpendicular
         * Method checks if two vectors are perpendicular
         */ 
        // We take dot product of two vectors. The result is equal to 0, it means that 2 vectors are perpendicular
        const dotProduct = this.normalize().dotProduct(other.normalize())
        return this._areEqual(dotProduct, 0)
    }

    crossProduct({components}) {
        /** FOR 3D Vectors
         * @param {Array} components - vector
         * @return {Vector} - return new Vector that is perpendicular to two input vectors
         * Method calculates crossProduct of two vectors, returning new vector
         * 
         *                              | i   j   k  |
         * Formula: vectorA * vectorB = | Ax  Ay  Az | = i(Ay * Bz - Az * By) - j(Ax * Bz - Az * Bx) + k(Ax * By - Ay * Bx)
         *                              | Bx  By  Bz |
         * 
         * Example: 
         * 
         * Vector(2, 1, 1)  
         * Vector(1, 2, 2) -> 
         *                      i(1 * 2 - 1 * 2) - j(2 * 2 - 1 * 1) + k(2 * 2 - 1 * 1) -> 
         *                                                                                  [i(0),-j(3),+k(3)] = [0, -3 , 3]
         * 
         */
        if(this.components.length !== components.length) {
            throw new Error('Vectors should be the same size!')
        }
        return new Vector([
            this.components[1] * components[2] - this.components[2] * components[1],
            this.components[2] * components[0] - this.components[0] * components[2],
            this.components[0] * components[1] - this.components[1] * components[0]
        ])
    }

    angleBetween(other) {
        /**
         * @param {Vector} other - vector
         * @returns {Number} angle in degrees between 2 vectors
         * Method calculates the angle between 2 vectors.
         * The Math.acos() function returns the arccosine (in radians) of a number
         */ 
        return this._toDegrees(
            Math.acos(
                this.dotProduct(other) / (this.length() * other.length())
            )
        )
    }

    negate() {
        /**
         * @returns {Vector} - vector directing to the negative direction
         */
        return this.scaleBy(-1)
    }

    projectOn(other) {
        /**
         * @param {Vector} other - vector
         * @returns {Vector} projected vector
         * Method finds vector projection aka vector component or vector resolution
         */ 
        const normalized = other.normalize();
        return normalized.scaleBy(this.dotProduct(normalized))
    }

    withLength(newLength) {
        /**
         * @param {Number} newLength - new length of the vector
         * @return {Vector} vector with new length
         * Method makes vector a specific length
         */
        return this.normalize().scaleBy(newLength)
    }

    equalTo({components}) {
        /** 
         * @param {Array} components - vector
         * @returns {Boolean} true or false.
         * Methods checks if two vectors are equal to each other. If vectors are equal returns true. Otherwise, false.
         * The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
        */
       return components.every((component, index) => this._areEqual(component, this.components[index]))
    }

    transform(matrix) {
        /**
         * @param {Matrix} matrix
         * @return {Vector} resulting vector
         * The resulting vector will always be equal to the number of matrix rows. 
         * For example, if we multiply a 2D vector to a 3x2 matrix, we will receive a 3D vector.
         * When we multiply a 3D vector to a 2x3 matrix, we will receive a 2D vector.
         */
        const columns = matrix.columns()
        if(columns.length !== this.components.length) {
            throw new Error("Matrix columns length should be equal to vector components length")
        }

        const multiplied = columns.map((column, i) => column.map(c => c * this.components[i]));
        const newComponents = multiplied[0].map((_, i) => this._sum(multiplied.map(column => column[i])))
        return new Vector([...newComponents])
    }

    min() {
        /**
         * @return {Number} minimum value in the vector
         * Method finds the minimum value in the vector
         */
        if(this.components.length > 40) {
            // This is due to the performance of Math.min(), Math.min is slower in processing large vectors
            const [min, max] = this._forLoopMinMax();
            return min;
        } 
        return Math.min(...this.components);
    }

    max() {
        /**
         * @return {Number} maximum value in the vector
         * Method finds the maximum value in the vector
         */
        if(this.components.length > 40) {
            const [min, max] = this._forLoopMinMax();
            return max;
        }
        return Math.max(...this.components);
    }

    exp() {
      /**
       * @return {Vector} vector to the Euler's number power 
       * Method forms vector to the Euler's number power
       * The Math.exp() function returns ex, where x is the argument, and e is Euler's number (also known as Napier's constant),
       * the base of the natural logarithms.
       */
      return new Vector([
          ...this.components.map((component) => Math.exp(component))
      ]) 
    }

    power(exponent) {
        /**
         * @param {Number} - exponent
         * @return {Vector} - vector to the exponent power
         * Method performs vector exponentiation
         */
        return new Vector([
            ...this.components.map((component) => component ** exponent)
        ])
    }

    mean() {
        /**
         * @return {Number} - mean of the vector
         * Method calculates mean of the vector
         */
        let sum = 0;
        this.components.forEach((component) => sum += component);
        return sum / this.components.length
    }

    argSort() {
        /**
         * @return {Array} indices that would sort an array
         * Methods returns indices that would sort an array
         * https://stackoverflow.com/questions/3730510/javascript-sort-array-and-return-an-array-of-indicies-that-indicates-the-positi
         */
        return Array.from(Array(this.components.length).keys())
                  .sort((a, b) => this.components[a] < this.components[b] ? -1 : (this.components[b] < this.components[a]) | 0)
    }

}

function exp(vector) {
    /**
     * @param {Vector} - vector
     * @return {Vector} vector to the Euler's number power 
     * Method forms vector to the Euler's number power
     * The Math.exp() function returns ex, where x is the argument, and e is Euler's number (also known as Napier's constant),
     * the base of the natural logarithms.
     */
    
    if(!vector instanceof Vector) {
        throw new Error("Argument should be type of Vector!")
    }
    return new Vector([
        ...vector.components.map((component) => Math.exp(component))
    ])
}


function dividedByVector(number, vector) {
    /**
     * @param {Number} - number which is divided by vector
     * @param {Vector} - vector
     * @return {Vector} vector to the Euler's number power 
     * Method forms vector to the Euler's number power
     * The Math.exp() function returns ex, where x is the argument, and e is Euler's number (also known as Napier's constant),
     * the base of the natural logarithms.
     */
    return new Vector([
        ...vector.components.map((component) => number / component)
    ])
} 


module.exports = {
    Vector, exp, dividedByVector
}