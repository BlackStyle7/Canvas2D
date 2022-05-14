/**
 * 用于描述时间信息
 */
const Clock = class {

	constructor() {

		this.totalTime = 0.0;  // 程序运行到现在为止运行的总时间
		this.frameTime = 0.0;  // 当前帧时间
	}

	/**
	 * 更新当前时间信息
	 * @param { Number } totalTime must 
	 */
	update( totalTime ) {

		const frameTime = totalTime - this.totalTime;
		this.frameTime = frameTime > 2.0 ? 0.17 : frameTime;

		this.totalTime = totalTime;
	}
}

export default Clock;