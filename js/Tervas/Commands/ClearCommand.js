import Command from './Command.js';

const ClearCommand = class extends Command {

	constructor( canvas ) {
		super( {
			render: ( cxt, width, height ) => {
				cxt.clearRect( 0.0, 0.0, width, height );
			},
		} );

		this.canvas = canvas;
	}
}

export default ClearCommand;