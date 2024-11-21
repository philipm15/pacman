export class Node {
    canvas;

    constructor(canvas) {
        this.canvas = canvas;
    }

    get ctx() {
        return this.canvas?.getContext('2d');
    }
}