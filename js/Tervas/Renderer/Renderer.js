const Renderer = class {

	constructor( container ) {

		this.container = container;
		this.canvas = this.initCanvas();
		this.cxt = this.canvas.getContext( '2d' );
		this.resize();

		this.commandList = [];

		this.initEventListeners();
	}

	render( scene, clock ) {
		const { commandList, canvas, cxt } = this;
		commandList.splice( 0 );  // 清空渲染队列

		// 将 scene 中存储的各个元素添加到渲染列表中
		const { children } = scene;
		for ( let i = 0, len = children.length; i < len; ++i ) {
			children[ i ].update( commandList );
		}

		// 执行渲染队列
		const { width, height } = canvas;
		for ( let i = 0 , len = commandList.length; i < len; ++i ) {
			commandList[ i ].render( cxt, width, height, clock );
		}
	}

	resize = e => {

		const { width, height } = this.container.getBoundingClientRect();
		this.canvas.width = width;
		this.canvas.height = height;
	}

	/**
	 * 初始化事件
	 */
	initEventListeners() {

		// resize
		window.addEventListener( 'resize', this.resize );
	}

	/**
	 * 初始化 canvas
	 * @return <Canvas DOM>
	 */
	initCanvas() {

		const { container } = this;
		const canvas = document.createElement( 'canvas' );
		container.appendChild( canvas );
		return canvas;
	}
}

export default Renderer;