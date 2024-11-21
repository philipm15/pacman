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
    animationFrameId;
    velocityY = 0;
    velocityX = 0;
    lastTimestamp = 0;
    velocity = 150;

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
        const keyState = {};

        document.addEventListener('keydown', e => {
            keyState[e.key.toLowerCase()] = true;
            this.updateVelocity(keyState);
        });

        document.addEventListener('keyup', e => {
            keyState[e.key.toLowerCase()] = false;
            this.updateVelocity(keyState);
        });

        this.setupAnimation();
    }

    updateVelocity(keyState) {
        this.velocityX = 0;
        this.velocityY = 0;

        if (keyState['arrowup'] || keyState['w']) {
            this.velocityY -= this.velocity;
        }
        if (keyState['arrowdown'] || keyState['s']) {
            this.velocityY += this.velocity;
        }
        if (keyState['arrowleft'] || keyState['a']) {
            this.velocityX -= this.velocity;
        }
        if (keyState['arrowright'] || keyState['d']) {
            this.velocityX += this.velocity;
        }
    }

    setupAnimation() {
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
        }
    }

    loop(timestamp) {
        const deltaTime = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        this.updatePosition(deltaTime);
        this.draw(deltaTime);
        this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
    }

    updatePosition(deltaTime) {
        this.positionX += this.velocityX * deltaTime;
        this.positionY += this.velocityY * deltaTime;
    }

    draw(deltaTime) {
        clearCanvasCtx(this.ctx);

        this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height * this.scale);
        this.ctx.fillRect(this.positionX, (this.positionY + this.height) - (this.height * this.scale), this.width, this.height * this.scale);

        if (this.growing) {
            this.scale + deltaTime > 1 ? this.scale = 1 : this.scale += deltaTime;
            if (this.scale >= 1) this.growing = false;
        } else {
            this.scale - deltaTime < 0.2 ? this.scale = 0.2 : this.scale -= deltaTime;
            if (this.scale <= 0.2) this.growing = true;
        }
    }
}