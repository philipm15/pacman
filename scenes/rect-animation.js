"use strict";

import {getRandomColor} from "../lib/color.js";

export function createRectAnimation(canvas) {
    return new RectAnimation(canvas);
}

class RectAnimation {
    canvas;
    gridSize = 16; // Number of cells per row and column
    rectWidth;
    rectHeight;

    constructor(canvas) {
        this.canvas = canvas;
        this.rectWidth = canvas.width / this.gridSize;
        this.rectHeight = canvas.height / this.gridSize;
        const ctx = canvas.getContext('2d');

        canvas.addEventListener('mousedown', (event) => {
            console.log({event})
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Calculate grid cell
            const col = Math.floor(x / this.rectWidth);
            const row = Math.floor(y / this.rectHeight);

            // Highlight the clicked cell
            ctx.fillStyle = getRandomColor();
            ctx.fillRect(col * this.rectWidth, row * this.rectHeight, this.rectWidth, this.rectHeight);
        })
    }

    get ctx() {
        return this.canvas.getContext('2d');
    }

    drawGrid() {
        const ctx = this.ctx;
        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = 1;

        // Draw vertical lines
        for (let x = 0; x <= this.canvas.width; x += this.rectWidth) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.canvas.height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= this.canvas.height; y += this.rectHeight) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.canvas.width, y);
            ctx.stroke();
        }
    }

    start() {
        this.clear();
        this.drawGrid();

        let delay = 0;
        let previousX = -1;
        let previousY = -1;

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                setTimeout(() => {
                    if (previousX !== -1 && previousY !== -1) {
                        // this.ctx.clearRect(previousX * this.rectWidth, previousY * this.rectHeight, this.rectWidth, this.rectHeight);
                        // this.drawGrid();
                    }
                    this.ctx.fillStyle = getRandomColor();
                    this.ctx.fillRect(j * this.rectWidth, i * this.rectHeight, this.rectWidth, this.rectHeight);

                    previousX = j;
                    previousY = i;
                }, delay);
                delay += 200;
            }
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
