import AnimationRenderer from '../Renderers/AnimationRenderer.js';
import Scene from '../Scene/Scene.js';
import Clock from '../Clock/Clock.js';

const Viewer = class {
	
	constructor( container ) {

		this.container = container;
		this.renderer = new AnimationRenderer( container );
		this.scene = new Scene();
		this.clock = new Clock();

		this.width = 300;
		this.height = 200;

		// tool canvas
		this.toolCanvas = undefined;

		this.initEventListeners();
	}

	resize = () => {
		this.renderer.resize();
		this.width = this.renderer.canvas.width;
		this.height = this.renderer.canvas.height;
	}

	initEventListeners() {

		this.resize();
		window.addEventListener( 'resize', this.resize );

		// drive frame
		window.requestAnimationFrame( this.driveFrame );
	}

	add( child ) {

		return this.scene.add( child );;
	}

	frame( totalTime ) {
		this.clock.update( totalTime / 1000.0 );  // 更新时间信息
		this.renderer.render( this );
	}

	error( info ) {
		console.error( info, 'render is stoped.' );
	}

	driveFrame = totalTime => {

		let needNextFrame = true;  // 用于判定是否执行下一帧
		try {
			this.frame( totalTime );
		}
		catch( e ) {
			needNextFrame = false;
			this.error( e );
		}

		if ( !needNextFrame ) return;
		window.requestAnimationFrame( this.driveFrame );  // 驱动下一帧
	}
}

export default Viewer;