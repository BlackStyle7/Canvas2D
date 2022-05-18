const EventCommander = class {

	constructor() {

		this.funcs = [];
	}

	addEvent( func ) {
		if ( typeof func !== 'function' ) return;
		this.funcs.push( func );
	}

	traverse( callFunc ) {
		
		for ( let i = 0, len = this.funcs.length; i < len; ++i ) {
			callFunc( this.funcs[ i ] );
		}
	}
}

export default EventCommander;