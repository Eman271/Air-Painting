// ── Catmull-Rom smooth stroke ─────────────────────────────────────────────────
function catmullSeg(ctx, p0, p1, p2, p3) {
    const t = 0.5;
    ctx.bezierCurveTo(
        p1.x + (p2.x - p0.x) / 6 * t * 2, p1.y + (p2.y - p0.y) / 6 * t * 2,
        p2.x - (p3.x - p1.x) / 6 * t * 2, p2.y - (p3.y - p1.y) / 6 * t * 2,
        p2.x, p2.y
    );
}
function paint(x, y, erasing) {
    strokePoints.push({ x, y });
    if (strokePoints.length > 5) strokePoints.shift();
    const n = strokePoints.length;
    drawCtx.save();
    if (erasing) {
        drawCtx.globalCompositeOperation = 'destination-out';
        drawCtx.strokeStyle = drawCtx.fillStyle = 'rgba(0,0,0,1)';
        drawCtx.lineWidth = brushSz * 4; drawCtx.shadowBlur = 0;
    } else {
        drawCtx.globalCompositeOperation = 'source-over';
        drawCtx.strokeStyle = drawCtx.fillStyle = color;
        drawCtx.lineWidth = brushSz;
        drawCtx.shadowColor = color; drawCtx.shadowBlur = brushSz * 1.4;
    }
    drawCtx.lineCap = 'round'; drawCtx.lineJoin = 'round';
    drawCtx.beginPath();
    if (n === 1) {
        drawCtx.arc(x, y, erasing ? brushSz * 2 : brushSz / 2, 0, Math.PI * 2);
        drawCtx.fill();
    } else if (n === 2) {
        drawCtx.moveTo(strokePoints[0].x, strokePoints[0].y);
        drawCtx.lineTo(x, y); drawCtx.stroke();
    } else {
        const i = n - 1;
        const p0 = strokePoints[Math.max(0, i - 2)], p1 = strokePoints[i - 1], p2 = strokePoints[i];
        const p3 = { x: p2.x + (p2.x - p1.x), y: p2.y + (p2.y - p1.y) };
        drawCtx.moveTo(p1.x, p1.y);
        catmullSeg(drawCtx, p0, p1, p2, p3);
        drawCtx.stroke();
    }
    drawCtx.restore();
}
