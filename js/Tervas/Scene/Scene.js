const Scene = class {

    constructor() {

        this.children = [];
    }

    add( child ) {
        this.children.push( child );
    }
}

export default Scene;