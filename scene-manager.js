"use strict";

import {createRectAnimation} from "./scenes/rect-animation.js";
import {createPacmanAnimation} from "./scenes/pacman-animation.js";

document.addEventListener('DOMContentLoaded', () => {
    const stopBtn = document.getElementById('stopBtn');
    const canvas = document.getElementById('canvas')
    const rectAnimationBtn = document.getElementById('rectAnimationBtn');
    const pacmanAnimationBtn = document.getElementById('pacmanAnimationBtn');
    const iframe = document.getElementById('iframe');

    let currentScene = undefined;
    let clicked = 0;

    function resetCanvas() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.reset();
        if(currentScene?.animationFrameId) {
            window.cancelAnimationFrame(currentScene.animationFrameId);
        }
    }

    rectAnimationBtn.addEventListener('click', () => {
        resetCanvas();
        currentScene = createRectAnimation(canvas);
        currentScene.drawGrid();
        currentScene.start();
        clicked += 1;

        if (clicked >= 5) {
            iframe.style.display = 'block';
            iframe.play();
        }
    })

    pacmanAnimationBtn.addEventListener('click', () => {
        resetCanvas();
        currentScene = createPacmanAnimation(canvas, canvas.width / 5, canvas.height / 5);
        currentScene.start();
    })

    stopBtn.addEventListener('click', () => {
        resetCanvas();
        currentScene = undefined;
    })
})