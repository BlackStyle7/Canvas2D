import DrawCommand from './DrawCommand.js';

const ClearCommand = class extends DrawCommand {

	constructor() {
		super();
	}

	render( cxt, viewer ) {
		cxt.clearRect( 0, 0, viewer.width, viewer.height );
	}
}

export default ClearCommand;