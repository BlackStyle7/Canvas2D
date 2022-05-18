import Particle from './Particle.js';
import Vector2 from '../Math/Vector2.js';
import CanvasMath from '../Math/CanvasMath.js';

const defaultPosition = new Vector2( 0, 0 );

/**
 * 每个粒子应当有自己的更新方式，渲染方法，生命周期
 * 但由于优化的考虑，更新方式应当由上级图层同意管理
 * 否则每个粒子都要一个 DrawCommand 管理会浪费大量性能
 */
const SnowParticle = class extends Particle {
	
	constructor( option = {} ) {
		super();

		this.position = option.position || defaultPosition.copy();  // 当前位置
		this.radius = option.radius || 1;  // 粒子半径
		this.target = new Vector2( 0, 0 );  // 速度方向修正目标
		this.maxTargetRange = new Vector2( 30.0, 30.0 );  // 修正目标随机生成范围
		this.v = option.v;  // 当前速度方向
		this.vSize = option.vSize || 0;  // 该粒子速度大小
		this.lifeTimeRange = option.lifeTimeRange;  // 生命周期范围
		this.lifeTime = 0;  // 生命周期
		this.time = 0;  // 当前生命周期内容

		this.updateLifeTime();
	}

	updateLifeTime() {
		const { x, y } = this.lifeTimeRange;
		this.lifeTime = CanvasMath.getRandom( x, y );
	}
}

export default SnowParticle;