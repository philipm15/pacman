console.log("test")
document.addEventListener('DOMContentLoaded', () => {
    const loadingPlaceholder = document.getElementById('loadingPlaceholder');
    setTimeout(() => {
        loadingPlaceholder.innerHTML = 'Loading finished'
    }, 500)

    createGameCanvas();
})

function createGameCanvas() {
    const gameCanvas = document.getElementById('gameCanvas');
    const gameScene = new GameScene(gameCanvas);
    gameScene.drawGrid();
}

class GameScene {
    gridSize = 16; // Number of cells per row and column
    rectWidth;
    rectHeight;

    constructor(canvas) {
        this.canvas = canvas;
        this.rectWidth = canvas.width / this.gridSize;
        this.rectHeight = canvas.height / this.gridSize;
        const ctx = canvas.getContext('2d');

        canvas.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Calculate grid cell
            const col = Math.floor(x / this.rectWidth);
            const row = Math.floor(y / this.rectHeight);

            // Highlight the clicked cell
            ctx.fillStyle = 'black';
            ctx.fillRect(col * this.rectWidth, row * this.rectHeight, this.rectWidth, this.rectHeight);
        })
    }

    get ctx() {
        return this.canvas.getContext('2d');
    }

// Draw grid
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

    clear() {
        this.ctx.clear();
        this.drawGrid();
    }
}
