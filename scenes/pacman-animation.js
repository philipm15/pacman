"use strict";

import {getRandomColor} from "../lib/color.js";
import {clearCanvasCtx} from "../lib/canvas-helpers.js";

export function createPacmanAnimation(canvas) {
    return new PacmanAnimation(canvas);
}

class PacmanAnimation {
    width = 100;
    height = 100;
    scale = 1;
    growing = false;
    color = getRandomColor();
    delta = 0.016;

    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width ?? 100;
        this.height = height ?? 100;
        this.ctx.fillStyle = this.color;
    }

    get ctx() {
        return this.canvas.getContext('2d');
    }

    get centerX() {
        if (this.canvas && this.canvas.width) {
            return Math.floor(this.canvas.width / 2);
        } else {
            return 0;
        }
    }

    get centerY() {
        if (this.canvas && this.canvas.height) {
            return Math.floor(this.canvas.height / 2);
        } else {
            return 0;
        }
    }

    startAnimation() {
        clearCanvasCtx(this.ctx);
        const rectOneMatrix = [this.centerX - this.width / 2, this.centerY - this.height / 2];
        const rectTwoMatrix = [this.centerX - this.width / 2, this.centerY + this.height / 2];

        this.ctx.fillRect(rectOneMatrix[0], rectOneMatrix[1], this.width, this.height * this.scale);
        this.ctx.fillRect(rectTwoMatrix[0], rectTwoMatrix[1] - (this.height * this.scale), this.width, this.height * this.scale);

        if (this.growing) {
            this.scale += this.delta;
            if (this.scale >= 1) this.growing = false;
        } else {
            this.scale -= this.delta;
            if (this.scale <= 0.2) this.growing = true;
        }

        return requestAnimationFrame(this.startAnimation.bind(this));
    }
}