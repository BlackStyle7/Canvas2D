import DrawCommand from '../Commands/DrawCommand.js';

/**
 * 最基本的绘图单元
 * 本身存在几何形状和样式的信息，并构建 drawCommand
 * 同时存在子元素的管理，
 */
const Object2D = class {
	
	constructor( geometry, style ) {

		this.geometry = geometry;
		this.style = style;

		if ( this.geometry && this.style ) {
			this.drawCommand = new DrawCommand( { geometry, style } );
		}
		
		this.children = [];
	}

	// 遍历所有子元素
	traverse( callFunc ) {

		for ( let i = 0, len = this.children.length; i < len; ++i ) {
			callFunc( this.children[ i ] );
		}
	}

	add( child ) {
		this.children.push( child );
		return child;
	}

	update( commandList, viewer ) {
		if ( this.drawCommand ) commandList.push( this.drawCommand );

		// 如果有子元素，将子元素也添加进渲染队列
		this.traverse( item => {
			item.update( commandList, viewer );
		} );
	}
}

export default Object2D;