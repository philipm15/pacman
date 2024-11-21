export class BaseNode {
    constructor(canvas) {
        this.canvas = canvas;
        this.children = [];
        this.parent = null;
        this.position = {x: 0, y: 0};
        this.rotation = 0;
        this.scale = {x: 1, y: 1};
        this.visible = true;
        this.components = [];
    }

    get ctx() {
        return this.canvas?.getContext('2d');
    }

    get width() {
        return this.canvas?.width;
    }

    get height() {
        return this.canvas?.height;
    }

    addChild(node) {
        node.parent = this;
        this.children.push(node);
    }

    removeChild(node) {
        const index = this.children.indexOf(node);
        if (index > -1) {
            node.parent = null;
            this.children.splice(index, 1);
        }
    }

    addComponent(component) {
        this.components.push(component);
        component.node = this;
    }

    update(deltaTime) {
        if (this.visible) {
            this.components.forEach(component => component.update(deltaTime));
            this.children.forEach(child => child.update(deltaTime));
        }
    }

    draw() {
        if (this.visible) {
            this.ctx.save();
            this.ctx.translate(this.position.x, this.position.y);
            this.ctx.rotate(this.rotation);
            this.ctx.scale(this.scale.x, this.scale.y);

            this.render();

            this.children.forEach(child => child.draw());

            this.ctx.restore();
        }
    }

    render() {
        // Override this method in subclasses to provide custom rendering logic
    }
}