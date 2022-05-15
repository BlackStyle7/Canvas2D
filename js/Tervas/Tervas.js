import Renderer from './Renderer/Renderer.js';
import Scene from './Scene/Scene.js';
import Clock from './Clock/Clock.js';

const Tervas = class {
	
	constructor( container ) {

		this.container = container;
		this.renderer = new Renderer( container );
		this.scene = new Scene();
		this.clock = new Clock();

		// tool canvas
		this.toolCanvas = undefined;

		// drive frame
		window.requestAnimationFrame( this.driveFrame );
	}

	add( child ) {

		this.scene.add( child );
	}

	driveFrame = totalTime => {

		let needNextFrame = true;
		try {
			this.clock.update( totalTime / 1000.0 );  // 更新时间信息
			this.renderer.render( this.scene, this.clock );
		}
		catch( e ) {
			needNextFrame = false;
			console.error( e, 'render is stoped.' );
		}

		if ( !needNextFrame ) return;
		window.requestAnimationFrame( this.driveFrame );  // 驱动下一帧
	}
}

export default Tervas;