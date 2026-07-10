// ── DOM References ────────────────────────────────────────────────────────────
const video = document.getElementById('video');
const drawCanvas = document.getElementById('drawCanvas');
const overlayCanvas = document.getElementById('overlayCanvas');
const drawCtx = drawCanvas.getContext('2d');
const overlayCtx = overlayCanvas.getContext('2d');
const statusEl = document.getElementById('status');
const loadingEl = document.getElementById('loading');
const cursorEl = document.getElementById('cursor');
const clearRingEl = document.getElementById('clearRing');
const clearArcEl = document.getElementById('clearArc');

// ── Shared State ──────────────────────────────────────────────────────────────
let color = '#ffffff', brushSz = 8, tool = 'draw', isDrawing = false;
let rawX = null, rawY = null, smX = null, smY = null;
const SMOOTH = 0.3;
const strokePoints = [];
let pendingGesture = 'none', gestureFrames = 0, activeGesture = 'none';
const DEBOUNCE = 3;
let clearStartTime = null;
const CLEAR_MS = 1500;
const history = [], MAX_HIST = 25;

// ── Coords (landmarks are normalised; video is CSS-mirrored so mirror X) ──────
function lmXY(lm) {
    return { x: (1 - lm.x) * drawCanvas.width, y: lm.y * drawCanvas.height };
}
