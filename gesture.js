// ── Gesture Recognition ───────────────────────────────────────────────────────
function fExt(lm, tip, pip, mcp) { return lm[tip].y < lm[pip].y - 0.04 && lm[tip].y < lm[mcp].y; }
function fCurl(lm, tip, mcp) { return lm[tip].y > lm[mcp].y - 0.01; }
function rawGesture(lm) {
    const iE = fExt(lm, 8, 6, 5), mE = fExt(lm, 12, 10, 9), rE = fExt(lm, 16, 14, 13), pE = fExt(lm, 20, 18, 17);
    const mC = fCurl(lm, 12, 9), rC = fCurl(lm, 16, 13), pC = fCurl(lm, 20, 17), iC = fCurl(lm, 8, 5);
    const tO = lm[4].x < lm[5].x;
    const n = [iE, mE, rE, pE].filter(Boolean).length;
    if (n >= 4) return 'clear';
    if (tO && pE && iC && mC && rC) return 'erase';
    if (iE && mE && rC && pC) return 'pause';
    if (iE && mC && rC && pC) return 'draw';
    return 'none';
}
function stepGesture(lm) {
    const r = rawGesture(lm);
    if (r === pendingGesture) gestureFrames++;
    else { pendingGesture = r; gestureFrames = 1; }
    if (gestureFrames >= DEBOUNCE && r !== activeGesture) {
        if (activeGesture === 'draw' || activeGesture === 'erase') {
            strokePoints.length = 0; isDrawing = false;
        }
        activeGesture = r;
    }
    return activeGesture;
}
