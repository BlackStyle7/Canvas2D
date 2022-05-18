import Object2D from '../Objects/Object2D.js';
import DrawCommand from '../Commands/DrawCommand.js';
import Vector2 from '../Math/Vector2.js';
import Style from '../Styles/Style.js';
import CanvasMath from '../Math/CanvasMath.js';

const SnowLayer = class extends Object2D {

	constructor( option = {} ) {
		super();

		this.isInit = false;

		// 风场方向、法线、大小
		this.windDirection = option.windDirection || new Vector2( 0, 0 );
		this.windDirection.normalize();
		this.windNormal = new Vector2( this.windDirection.y, -this.windDirection.x );

		// 圆周弧度常量
		this.PI2 = Math.PI * 2;

		// 粒子样式
		this.style = new Style( {
			fillStyle: 'rgba( 255, 255, 255, 1.0 )',
			shadowColor: 'rgba( 255, 255, 255, 1.0 )',
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowBlur: 5,
		} );

		// 更新状态相关
		this.vDirection = new Vector2();  // 用于存储 v 方向中间量
		this.nDirection = new Vector2();  // 用于存储 n 方向中间量
		this.delta = new Vector2();

		// 绘图命令
		this.command = new DrawCommand( {
			render: ( cxt ) => {

				cxt.beginPath();
				this.traverse( item => {

					cxt.arc( item.position.x, item.position.y, item.radius, 0, this.PI2, true );
					cxt.closePath();
				} );

				this.style.setStyle( cxt );
				cxt.fill();

				// const l = 30;
				// this.traverse( item => {

				// 	const { position, target, v } = item;

				// 	cxt.beginPath();
				// 	cxt.arc( position.x, position.y, item.radius, 0, this.PI2, true );
				// 	cxt.closePath();
					
				// 	cxt.fillStyle = 'red';
				// 	cxt.fill();
					
				// 	cxt.beginPath();
				// 	cxt.arc( target.x, target.y, item.radius, 0, this.PI2, true );
				// 	cxt.closePath();
					
				// 	cxt.fillStyle = 'green';
				// 	cxt.fill();

				// 	cxt.beginPath();
				// 	// x
				// 	cxt.moveTo( position.x, position.y );
				// 	cxt.lineTo( position.x + this.windDirection.x * l, position.y + this.windDirection.y * l );
				// 	// y
				// 	cxt.moveTo( position.x, position.y );
				// 	cxt.lineTo( position.x + this.windNormal.x * l, position.y + this.windNormal.y * l );
				// 	// 速度
				// 	cxt.moveTo( position.x, position.y );
				// 	cxt.lineTo( position.x + v.x, position.y + v.y );
				// 	cxt.stroke();
				// } );
			},
		} );
	}

	/**
	 * 更新雪花的目标点
	 */
	updateTarget( snowFlower ) {

		const { windDirection: vAxis, windNormal: nAxis } = this;
		const { maxTargetRange, position, target } = snowFlower;
		const { x: xRange, y: yRange } = maxTargetRange;

		const vRandom = CanvasMath.getRandom( 0.0, xRange );
		const nRandom = CanvasMath.getRandom( 0.0, yRange );

		Vector2.multiplyByScale( vAxis, vRandom, this.vDirection );
		Vector2.multiplyByScale( nAxis, nRandom, this.nDirection );
		
		Vector2.add( this.vDirection, this.nDirection, this.delta );
		Vector2.add( position, this.delta, target );
	}

	// 动画逻辑
	animation = viewer => {

		const { width, height } = viewer;
		const { frameTime: time } = viewer.clock;
		this.traverse( snowFlower => {

			// 更新当前粒子的坐标
			snowFlower.v.copy( this.delta );
			this.delta.multiplyByScale( time );
			snowFlower.position.add( this.delta );

			// 更新粒子生命周期
			snowFlower.time += time;
			if ( snowFlower.time > snowFlower.lifeTime ) {

				snowFlower.time = 0;
				snowFlower.updateLifeTime();
				this.updateTarget( snowFlower );
			}

			// 更新粒子速度方向
			Vector2.sub( snowFlower.target, snowFlower.position, this.delta );
			this.delta.normalize();
			this.delta.multiplyByScale( 0.5 );

			snowFlower.v.add( this.delta );
			snowFlower.v.normalize();
			snowFlower.v.multiplyByScale( snowFlower.vSize );


			// 碰撞检测
			const r = snowFlower.radius + this.style.shadowBlur;
			const { x, y } = snowFlower.position;
			if      ( x + r < 0      ) {  // 左边界
				snowFlower.position.x = width + r;
			}
			else if ( x - r > width  ) {  // 右边界
				snowFlower.position.x = -r;
			}
			if      ( y + r < 0      ) {  // 上边界
				snowFlower.position.y = height + r;
			}
			else if ( y - r > height ) {  // 下边界
				snowFlower.position.y = -r;
			}
		} );
	}

	update( commandList, viewer ) {
		// 如果没有初始化，初始化他
		if ( !this.isInit ) {
			this.isInit = true;
			viewer.renderer.postRender.addEvent( this.animation );
		}
		// 将当前图元添加到渲染队列中
		commandList.push( this.command );
	}
}

export default SnowLayer;