const Vector2 = class {

	constructor( x = 0, y = 0 ) {

		this.x = x;
		this.y = y;
	}

	static set( x = 0, y = 0, vec ) {
		vec.x = x;
		vec.y = y;
		return vec;
	}
	set( x, y ) {
		return Vector2.set( x, y, this );
	}

	// 复制向量
	static copy( vecA, vecB ) {
		vecB.x = vecA.x;
		vecB.y = vecA.y;
		return vecB;
	}
	copy( vec ) {
		return Vector2.copy( this, vec );
	}

	// 向量缩放
	static multiplyByScale( vecA, value, vecB ) {
		vecB.x = vecA.x * value;
		vecB.y = vecA.y * value;
		return vecB;
	}
	multiplyByScale( value ) {
		return Vector2.multiplyByScale( this, value, this );
	}

	// 向量加法
	static add( vecA, vecB, vec ) {
		vec.x = vecA.x + vecB.x;
		vec.y = vecA.y + vecB.y;
		return vec;
	}
	add( vec ) {
		return Vector2.add( this, vec, this );
	}

	// 向量减法
	static sub( vecA, vecB, vec ) {
		vec.x = vecA.x - vecB.x;
		vec.y = vecA.x - vecB.x;
		return vec;
	}
	sub( vec ) {

		return Vector2.sub( this, vec, this );
	}

	// 向量模长
	static getLength( vec ) {
		return ( vec.x ** 2 + vec.y ** 2 ) ** 0.5;
	}
	getLength() {
		return Vector2.getLength( this );
	}

	// 向量归一化
	static normalize( vecA, vecB ) {
		const length = vecA.getLength();

		if ( length - 0.0 < 1e-7 ) {
			return vecA.copy( vecB );
		}

		vecB.x = vecA.x / length;
		vecB.y = vecA.y / length;
	}
	normalize() {
		return Vector2.normalize( this, this );
	}
}

export default Vector2;