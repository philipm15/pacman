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
    const ctx = gameCanvas.getContext('2d');
    ctx.lineWidth = 12;
    ctx.strokeRect(0, 0, ctx.width ?? 600, ctx.height ?? 600);
}
