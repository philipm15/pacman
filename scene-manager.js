"use strict";

import {createRectAnimation} from "./scenes/rect-animation.js";
import {createPacmanAnimation} from "./scenes/pacman-animation.js";

document.addEventListener('DOMContentLoaded', () => {
    // const loadingPlaceholder = document.getElementById('loadingPlaceholder');
    // setTimeout(() => {
    //     loadingPlaceholder.innerHTML = 'Loading finished'
    // }, 500)
    const restartBtn = document.getElementById('btnRestart');
    const canvas = document.getElementById('canvas')
    const rectAnimationBtn = document.getElementById('rectAnimationBtn');
    const pacmanAnimationBtn = document.getElementById('pacmanAnimationBtn');
    const iframe = document.getElementById('iframe');
    const animationFrames = [];

    let currentScene = undefined;
    let clicked = 0;

    function resetCanvas() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        animationFrames.forEach(frame => window.cancelAnimationFrame(frame));
    }

    rectAnimationBtn.addEventListener('click', () => {
        resetCanvas();
        currentScene = createRectAnimation(canvas);
        currentScene.drawGrid();
        currentScene.startAnimation();
        clicked += 1;

        if(clicked >= 5) {
            iframe.style.display = 'block';
            iframe.play();
        }
    })

    pacmanAnimationBtn.addEventListener('click', () => {
        resetCanvas();
        currentScene = createPacmanAnimation(canvas);
        animationFrames.push(currentScene.startAnimation());
    })

    restartBtn.addEventListener('click', () => {
        console.log("implement stop")
    })
})