const CanvasMath = class {

    constructor() {

    }

	static PI2 = Math.PI * 2;

    static getRandom( min = 0, max = 1 ) {
        return Math.random() * ( max - min ) + min;
    }
}

export default CanvasMath;