// ── Canvas resize ─────────────────────────────────────────────────────────────
function resize() {
    const W = window.innerWidth, H = window.innerHeight;
    let saved = null;
    if (drawCanvas.width > 0) {
        try { saved = drawCtx.getImageData(0, 0, drawCanvas.width, drawCanvas.height); } catch (e) { }
    }
    drawCanvas.width = overlayCanvas.width = W;
    drawCanvas.height = overlayCanvas.height = H;
    if (saved) try { drawCtx.putImageData(saved, 0, 0); } catch (e) { }
}
resize();
window.addEventListener('resize', resize);

// ── MediaPipe ─────────────────────────────────────────────────────────────────
const hands = new Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.55, minTrackingConfidence: 0.55 });
hands.onResults(onResults);

const cam = new Camera(video, {
    onFrame: async () => { await hands.send({ image: video }); },
    width: 1280, height: 720
});
cam.start()
    .then(() => { loadingEl.style.display = 'none'; })
    .catch(err => {
        loadingEl.innerHTML = `<span style="color:#ff4466">CAMERA ERROR<br><small>${err.message}</small></span>`;
    });

// ── Frame handler ─────────────────────────────────────────────────────────────
function onResults(results) {
    const W = drawCanvas.width, H = drawCanvas.height;
    const lm = results.multiHandLandmarks?.[0];

    if (!lm) {
        overlayCtx.clearRect(0, 0, W, H);
        statusEl.textContent = 'SHOW YOUR HAND'; statusEl.className = '';
        cursorEl.style.opacity = '0'; clearRingEl.style.opacity = '0';
        rawX = rawY = smX = smY = null; strokePoints.length = 0;
        isDrawing = false; clearStartTime = null;
        activeGesture = pendingGesture = 'none'; gestureFrames = 0;
        return;
    }

    const gesture = stepGesture(lm);
    drawSkeleton(lm);

    const tip = lmXY(lm[8]);
    rawX = tip.x; rawY = tip.y;
    if (smX === null) { smX = rawX; smY = rawY; }
    smX = smX * SMOOTH + rawX * (1 - SMOOTH);
    smY = smY * SMOOTH + rawY * (1 - SMOOTH);

    updateCursor(rawX, rawY, gesture);

    if (gesture === 'draw') {
        statusEl.textContent = '● DRAWING'; statusEl.className = 'drawing';
        if (!isDrawing) { saveHistory(); isDrawing = true; strokePoints.length = 0; }
        paint(smX, smY, false);
        clearStartTime = null; clearRingEl.style.opacity = '0';

    } else if (gesture === 'erase') {
        statusEl.textContent = '◌ ERASING'; statusEl.className = 'erasing';
        if (!isDrawing) { isDrawing = true; strokePoints.length = 0; }
        paint(smX, smY, true);
        clearStartTime = null; clearRingEl.style.opacity = '0';

    } else if (gesture === 'clear') {
        statusEl.textContent = '✋ HOLD TO CLEAR...'; statusEl.className = 'clearing';
        strokePoints.length = 0; isDrawing = false;
        if (!clearStartTime) clearStartTime = Date.now();
        const pct = Math.min((Date.now() - clearStartTime) / CLEAR_MS, 1);
        const circ = 2 * Math.PI * 34;
        clearRingEl.style.opacity = '1';
        clearRingEl.style.left = rawX + 'px'; clearRingEl.style.top = rawY + 'px';
        clearArcEl.style.strokeDashoffset = circ * (1 - pct);
        if (pct >= 1) {
            saveHistory(); drawCtx.clearRect(0, 0, W, H);
            clearStartTime = null; clearRingEl.style.opacity = '0';
            overlayCtx.fillStyle = 'rgba(255,255,255,0.2)'; overlayCtx.fillRect(0, 0, W, H);
        }

    } else {
        statusEl.textContent = gesture === 'pause' ? '⏸ PAUSED' : 'READY';
        statusEl.className = ''; strokePoints.length = 0;
        isDrawing = false; clearStartTime = null; clearRingEl.style.opacity = '0';
    }
}
