// ── UI ────────────────────────────────────────────────────────────────────────
function setTool(t) {
    tool = t;
    document.getElementById('btn-draw').classList.toggle('active', t === 'draw');
    document.getElementById('btn-erase').classList.toggle('active', t === 'erase');
}
document.getElementById('btn-draw').onclick = () => setTool('draw');
document.getElementById('btn-erase').onclick = () => setTool('erase');
document.getElementById('btn-undo').onclick = undo;
document.getElementById('btn-clear').onclick = () => { saveHistory(); drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height); };
document.getElementById('btn-save').onclick = () => {
    const out = document.createElement('canvas');
    out.width = drawCanvas.width; out.height = drawCanvas.height;
    const oc = out.getContext('2d');
    oc.save(); oc.translate(out.width, 0); oc.scale(-1, 1);
    oc.drawImage(video, 0, 0, out.width, out.height);
    oc.restore(); oc.drawImage(drawCanvas, 0, 0);
    const a = document.createElement('a');
    a.download = `airpainting_${Date.now()}.png`; a.href = out.toDataURL(); a.click();
};
document.querySelectorAll('.color-swatch').forEach(sw => {
    sw.onclick = () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active'); color = sw.dataset.color; setTool('draw');
    };
});
document.getElementById('brushSize').oninput = e => { brushSz = +e.target.value; };
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') undo();
    if (e.key === 'd') setTool('draw');
    if (e.key === 'e') setTool('erase');
    if (e.key === 'c') { saveHistory(); drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height); }
    if (e.key === 's') document.getElementById('btn-save').click();
});
