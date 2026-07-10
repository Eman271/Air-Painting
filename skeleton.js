// ── Skeleton overlay ──────────────────────────────────────────────────────────
const CONN = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [0, 9], [9, 10], [10, 11], [11, 12],
[0, 13], [13, 14], [14, 15], [15, 16], [0, 17], [17, 18], [18, 19], [19, 20], [5, 9], [9, 13], [13, 17]];
function drawSkeleton(lm) {
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    overlayCtx.save();
    for (const [a, b] of CONN) {
        const p1 = lmXY(lm[a]), p2 = lmXY(lm[b]);
        overlayCtx.beginPath(); overlayCtx.moveTo(p1.x, p1.y); overlayCtx.lineTo(p2.x, p2.y);
        overlayCtx.strokeStyle = 'rgba(255,255,255,0.22)'; overlayCtx.lineWidth = 1.5;
        overlayCtx.shadowColor = color; overlayCtx.shadowBlur = 5; overlayCtx.stroke();
    }
    for (let i = 0; i < lm.length; i++) {
        const p = lmXY(lm[i]);
        const iTip = i === 8, tip = [4, 8, 12, 16, 20].includes(i);
        overlayCtx.beginPath(); overlayCtx.arc(p.x, p.y, iTip ? 7 : tip ? 4 : 2.5, 0, Math.PI * 2);
        overlayCtx.fillStyle = iTip ? color : tip ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)';
        overlayCtx.shadowColor = color; overlayCtx.shadowBlur = iTip ? 22 : tip ? 9 : 4;
        overlayCtx.fill();
    }
    overlayCtx.restore();
}
