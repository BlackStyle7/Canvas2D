/**
 * 每个粒子应当有自己的更新方式，渲染方法，生命周期
 * 但由于优化的考虑，更新方式应当由上级图层同意管理
 * 否则每个粒子都要一个 DrawCommand 管理会浪费大量性能
 */
const Particle = class {

	constructor() {
		
	}
}

export default Particle;