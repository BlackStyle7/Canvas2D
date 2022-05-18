import ClearCommand from '../Commands/ClearCommand.js';
import EventCommander from '../Events/EventCommander.js';

const AnimationRenderer = class {

	constructor( container, option = {} ) {

		this.container = container;
		this.canvas = this.initCanvas();
		this.cxt = this.canvas.getContext( '2d' );
		this.resize();

		this.clearCommand = new ClearCommand();

		this.commandList = [];
		this.postRender = new EventCommander();
	}

	render( viewer ) {
		const { commandList, canvas, cxt } = this;
		commandList.splice( 0 );  // 清空渲染队列

		// 添加清空指令
		commandList.push( this.clearCommand );

		// 将 scene 中存储的各个元素添加到渲染列表中
		const { children } = viewer.scene;
		for ( let i = 0, len = children.length; i < len; ++i ) {
			children[ i ].update( commandList, viewer );
		}

		// 执行渲染队列
		for ( let i = 0 , len = commandList.length; i < len; ++i ) {
			commandList[ i ].render( cxt, viewer );
		}

		// 绘制完毕后执行回调函数
		this.postRender.traverse( func => {

			func( viewer );
		} );
	}

	resize( e ) {

		const { width, height } = this.container.getBoundingClientRect();
		this.canvas.width = width;
		this.canvas.height = height;
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

export default AnimationRenderer;