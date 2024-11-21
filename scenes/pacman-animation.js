"use strict";

import {getRandomColor} from "../lib/color.js";
import {clearCanvasCtx} from "../lib/canvas-helpers.js";

export function createPacmanAnimation(canvas) {
    return new PacmanAnimation(canvas);
}

class PacmanAnimation {
    width;
    height;
    scale = 1;
    growing = false;
    color = getRandomColor();
    positionX;
    positionY;
    delta = 0.03;
    animationFrameId;

    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width ?? 100;
        this.height = height ?? 100;
        this.positionX = this.centerX - this.width / 2;
        this.positionY = this.centerY - this.height / 2;
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

    start() {
        document.addEventListener('keydown', e => {
            const key = e.key.toLowerCase();
            // handle left, right, top, down, diagonally
            if (key === 'arrowup' || key === 'w') {
                this.positionY -= 5;
            }
            if (key === 'arrowdown' || key === 's') {
                this.positionY += 5;
            }
            if (key === 'arrowleft' || key === 'a') {
                this.positionX -= 5;
            }
            if (key === 'arrowright' || key === 'd') {
                this.positionX += 5;
            }
        });

        this.setupAnimation();
    }

    setupAnimation() {
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.move.bind(this));
        }
    }

    move() {
        this.draw();
        this.animationFrameId = requestAnimationFrame(this.move.bind(this));
    }

    draw() {
        clearCanvasCtx(this.ctx);

        this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height * this.scale);
        this.ctx.fillRect(this.positionX, (this.positionY + this.height) - (this.height * this.scale), this.width, this.height * this.scale);

        if (this.growing) {
            this.scale += this.delta;
            if (this.scale >= 1) this.growing = false;
        } else {
            this.scale -= this.delta;
            if (this.scale <= 0.2) this.growing = true;
        }
    }
}