// ── Cursor ────────────────────────────────────────────────────────────────────
function updateCursor(x, y, g) {
    cursorEl.style.left = x + 'px'; cursorEl.style.top = y + 'px';
    if (g === 'draw') {
        const d = brushSz * 2 + 10;
        cursorEl.style.cssText += `width:${d}px;height:${d}px;background:${color};border:none;
      box-shadow:0 0 ${brushSz * 2}px ${color},0 0 ${brushSz * 4}px ${color}88;opacity:.85;`;
    } else if (g === 'erase') {
        const d = brushSz * 8 + 8;
        cursorEl.style.cssText += `width:${d}px;height:${d}px;background:transparent;
      box-shadow:none;border:2px dashed rgba(255,90,90,.85);opacity:.9;`;
    } else if (g === 'pause') {
        cursorEl.style.cssText += `width:22px;height:22px;background:rgba(255,255,255,.18);
      box-shadow:none;border:2px solid rgba(255,255,255,.45);opacity:.7;`;
    } else {
        cursorEl.style.opacity = '0';
    }
}
