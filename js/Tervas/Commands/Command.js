const Command = class {

	constructor( option = {} ) {

		this.render = typeof option.render === 'function'
			? option.render
			: undefined
		;
	}

	_render( cxt, width, height, clock ) {
		this.render( cxt, width, height, clock );
	}
}

export default Command;