import Command from '../Commands/DrawCommand.js';

const Ball = class {

	constructor() {
		
		this.command = undefined;
	}

	initCommand() {

		const command = new Command( {
			render: ( cxt, width, height ) => {
				cxt.arc( width*0.5, height*0.5, 50, 0, Math.PI*2, true );
				cxt.fill();
			}
		} );

		return command;
	}

	_update( commandList ) {

		if ( !this.command ) this.command = this.initCommand();

		commandList.push( this.command );
	}
}

export default Ball;