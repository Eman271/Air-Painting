// ── Undo History ──────────────────────────────────────────────────────────────
function saveHistory() {
    if (history.length >= MAX_HIST) history.shift();
    history.push(drawCtx.getImageData(0, 0, drawCanvas.width, drawCanvas.height));
}
function undo() { if (history.length) drawCtx.putImageData(history.pop(), 0, 0); }
