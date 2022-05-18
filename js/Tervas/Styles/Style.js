const Style = class {

	constructor( option ) {

		for ( const name in option ) {
			this[ name ] = option[ name ];
		}
	}

	setStyle( cxt, viewer ) {

		for ( const name in this ) {
			cxt[ name ] = this[ name ];
		}
	}
}

export default Style;