# Air Painter: AI-Powered Gesture Drawing 🎨✨

Air Painter is an interactive, browser-based augmented reality drawing application. Built with **MediaPipe Hands** and **HTML5 Canvas**, it allows users to paint on their screen in real-time using only hand gestures. No mouse or keyboard required—just wave your hand to draw, erase, and control the canvas.

## ✨ Features

* **Real-Time Hand Tracking:** Utilizes Google's MediaPipe for precise, low-latency finger and joint detection.
* **Smart Gesture Controls:** Seamlessly switch between tools based on natural hand movements.
* **Modern UI/UX:** Features a sleek dark mode aesthetic with a glassmorphism floating toolbar and neon-glowing interactive cursors.
* **Smooth Strokes:** Implements Catmull-Rom spline interpolation to ensure curved, fluid, and natural-looking drawing strokes.
* **Full Toolset:** * Custom brush sizes and a vibrant neon color palette.
  * Multi-level **Undo** history.
  * **Save & Export:** Download your masterpiece directly as a `.png` with the webcam feed as the background.

## 🖐️ Gesture Guide

Air Painter watches your hand structure to determine your active tool. 

* **Draw:** Point your **Index Finger only** ☝️
* **Pause (Hover):** Point your **Index + Middle Fingers** ✌️ (Lifts the pen off the canvas)
* **Erase:** Hold out your **Thumb + Pinky** 🤙 (Like a "hang loose" sign)
* **Clear Canvas:** Hold an **Open Hand** 🖐️ (Hold steady until the loading ring completes)

## 🛠️ Tech Stack

* **HTML5 / CSS3** (Vanilla, single-file structure)
* **JavaScript (ES6+)**
* **HTML5 Canvas API** - For stroke rendering, skeleton overlays, and image exporting.
* **[MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)** - For machine learning-powered hand tracking.

## 🚀 How to Run

This project is zero-dependency and runs entirely in your browser.

1. Clone this repository or download the `index.html` file.
2. Double-click `index.html` to open it in Google Chrome, Edge, or any modern web browser.
3. When prompted, click **"Allow"** to grant webcam access.
4. Step back, show your hand to the camera, and start drawing!

> **Note:** If the camera does not load when opening directly from the file system (`file:///`), run it through a local development server (like VS Code's Live Server extension) to bypass browser CORS restrictions.

## 👨‍💻 Author

**Eman Fatima** GitHub: [@Eman271](https://github.com/Eman271)
