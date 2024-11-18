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

    // outline
    ctx.lineWidth = 12;
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

    gameCanvas.addEventListener('mouseup', (event) => {
        const rect = gameCanvas.getBoundingClientRect();

        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);
        ctx.fillStyle = 'green';
        ctx.fillRect(x - 10, y - 10, 20, 20);
    })
}
