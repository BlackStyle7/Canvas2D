import Command from '../Commands/Command.js';

const Ball = class {

	constructor() {
		
		this.command = undefined;
	}

	initCommand() {

		const command = new Command( {
			render: ( cxt, width, height ) => {
				cxt.arc( 100, 100, 50, 0, Math.PI*2, true );
				cxt.fill();
			}
		} );

		return command;
	}

	update( commandList ) {

		if ( !this.command ) this.command = this.initCommand();

		commandList.push( this.command );
	}
}

export default Ball;