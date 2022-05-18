const defaultRender = ( cxt, command, viewer ) => {

	command.geometry.setPath( cxt, viewer );
	command.style.setStyle( cxt, viewer  );
	if ( command.fill ) cxt.fill();
	if ( command.stroke ) cxt.stroke();
}

const DrawCommand = class {

	constructor( option = {} ) {
		
		this.geometry = option.geometry;
		this.style = option.style;
		this.fill = option.fill ?? true;
		this.stroke = option.stroke ?? true;

		this._render = option.render || defaultRender;
	}

	render( cxt, viewer ) {
		this._render( cxt, this, viewer );
	}
}

export default DrawCommand;