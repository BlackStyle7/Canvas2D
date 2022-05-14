import Command from '../Renderer/Command.js';

const Ball = class {

	constructor() {
		
		this.command = undefined;
	}

	initCommand() {

		const command = new Command();

		return command;
	}

	update( commandList ) {

		if ( !this.command ) this.command = this.initCommand();

		commandList.push( this.command );
	}
}

export default Ball;