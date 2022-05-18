import Geometry from './Geometry.js';

const PathGeometry = class extends Geometry {

	constructor( option = {} ) {
		super();

		this.points = [];
		this.close = option.close ?? true;
	}

	addPoint( point ) {
		this.points.push( point );
	}

	setPath( cxt, viewer ) {
		
		cxt.beginPath();
		cxt.moveTo( this.points[ 0 ].x, this.points[ 0 ].y );
		for ( let i = 1, len = this.points.length; i < len; ++i ) {
			const { x, y } = this.points[ i ];
			cxt.lineTo( x, y );
		}
		if ( this.close ) cxt.closePath();
	}
}

export default PathGeometry;