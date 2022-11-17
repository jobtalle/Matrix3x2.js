export class Matrix3x2 {
    buffer = new Float32Array(6);

    /**
     * Set the values of this matrix to the values of another matrix
     * @param {Matrix3x2} other The other matrix
     * @returns {Matrix3x2} The modified matrix
     */
    set(other) {
        this.buffer.set(other.buffer);

        return this;
    }

    /**
     * Multiply a vector by this matrix
     * @param {Vector2} vector The vector to multiply
     * @returns {Vector2} The multiplied vector
     */
    apply(vector) {
        const _x = vector.x;
        const _y = vector.y;

        vector.x = this.buffer[0] * _x + this.buffer[1] * _y + this.buffer[2];
        vector.y = this.buffer[3] * _x + this.buffer[4] * _y + this.buffer[5];

        return vector;
    }

    /**
     * Set this matrix to the identity matrix
     * @returns {Matrix3x2} The modified matrix
     */
    identity() {
        this.buffer[0] = this.buffer[4] = 1;
        this.buffer[1] = this.buffer[2] = this.buffer[3] = this.buffer[5] = 0;

        return this;
    }

    /**
     * Translate this matrix
     * @param {number} x The horizontal translation
     * @param {number} y The vertical translation
     * @returns {Matrix3x2} The translated matrix
     */
    translate(x, y) {
        this.buffer[2] += this.buffer[0] * x + this.buffer[1] * y;
        this.buffer[5] += this.buffer[3] * x + this.buffer[4] * y;

        return this;
    }

    /**
     * Translate this matrix without taking previous transformations into account
     * @param {number} x The horizontal translation
     * @param {number} y The vertical translation
     * @returns {Matrix3x2} The translated matrix
     */
    translateAbsolute(x, y) {
        this.buffer[2] += x;
        this.buffer[5] += y;

        return this;
    }

    /**
     * Rotate this matrix
     * @param {number} angle The amount of rotation in radians
     * @returns {Matrix3x2} The rotated matrix
     */
    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const _00 = this.buffer[0];
        const _10 = this.buffer[1];
        const _20 = this.buffer[2];
        const _01 = this.buffer[3];
        const _11 = this.buffer[4];
        const _21 = this.buffer[5];

        this.buffer[0] = _00 * cos - _01 * sin;
        this.buffer[1] = _10 * cos - _11 * sin;
        this.buffer[2] = _20 * cos - _21 * sin;

        this.buffer[3] = _00 * sin + _01 * cos;
        this.buffer[4] = _10 * sin + _11 * cos;
        this.buffer[5] = _20 * sin + _21 * cos;

        return this;
    }

    /**
     * Scale this matrix
     * @param {number} scale The scale
     * @returns {Matrix3x2} The scaled matrix
     */
    scale(scale) {
        this.buffer[0] *= scale;
        this.buffer[1] *= scale;
        this.buffer[2] *= scale;

        this.buffer[3] *= scale;
        this.buffer[4] *= scale;
        this.buffer[5] *= scale;

        return this;
    }

    /**
     * Multiply this matrix by another matrix
     * @param {Matrix3x2} other The other matrix
     * @returns {Matrix3x2} The matrix after multiplication
     */
    multiply(other) {
        const _00 = this.buffer[0];
        const _10 = this.buffer[1];
        const _20 = this.buffer[2];
        const _01 = this.buffer[3];
        const _11 = this.buffer[4];
        const _21 = this.buffer[5];

        this.buffer[0] = _00 * other.buffer[0] + _01 * other.buffer[1];
        this.buffer[1] = _10 * other.buffer[0] + _11 * other.buffer[1];
        this.buffer[2] = _20 * other.buffer[0] + _21 * other.buffer[1] + other.buffer[2];

        this.buffer[3] = _00 * other.buffer[3] + _01 * other.buffer[4];
        this.buffer[4] = _10 * other.buffer[3] + _11 * other.buffer[4];
        this.buffer[5] = _20 * other.buffer[3] + _21 * other.buffer[4] + other.buffer[5];

        return this;
    }

    /**
     * Invert this matrix
     * @returns {Matrix3x2} The inverted matrix
     */
    invert() {
        const _00 = this.buffer[0];
        const _10 = this.buffer[1];
        const _20 = this.buffer[2];
        const _01 = this.buffer[3];
        const _11 = this.buffer[4];
        const _21 = this.buffer[5];

        const i = 1 / (_00 * _11 - _10 * _01);

        this.buffer[0] = i * _11;
        this.buffer[1] = i * -_10;
        this.buffer[2] = i * (_10 * _21 - _20 * _11);
        this.buffer[3] = i * -_01;
        this.buffer[4] = i * _00;
        this.buffer[5] = i * (_20 * _01 - _00 * _21);

        return this;
    }

    /**
     * Get the horizontal translation
     * @returns {number} The horizontal translation
     */
    get x() {
        return this.buffer[2];
    }

    /**
     * Get the vertical translation
     * @returns {number} The vertical translation
     */
    get y() {
        return this.buffer[5];
    }
}