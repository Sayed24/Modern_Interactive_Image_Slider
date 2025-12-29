import { state } from "./state.js";
import { saveImage } from "./storage.js";
import { renderSlider, next, prev } from "./slider.js";
import { renderTimeline } from "./timeline.js";
import { exportGIF } from "./exportGif.js";
import { exportVideo } from "./exportVideo.js";
import { exportMP4 } from "./exportMp4.js";
import { pushHistory, undo, redo } from "./history.js";

export function setupUI() {

  document.getElementById("next").onclick = () => {
    next(); pushHistory();
  };

  document.getElementById("prev").onclick = () => {
    prev(); pushHistory();
  };

  document.getElementById("undo").onclick = () => {
    undo(); renderSlider(); renderTimeline();
  };

  document.getElementById("redo").onclick = () => {
    redo(); renderSlider(); renderTimeline();
  };

  document.getElementById("animation").onchange = e => {
    state.animation = e.target.value;
    pushHistory();
    renderSlider();
  };

  document.getElementById("themeSelect").onchange = e => {
    document.body.className = e.target.value;
    localStorage.setItem("theme", e.target.value);
  };

  document.getElementById("fileInput").onchange = e => {
    [...e.target.files].forEach(file => {
      saveImage(file);
      state.images.push(URL.createObjectURL(file));
    });
    pushHistory();
    renderSlider();
    renderTimeline();
  };

  document.getElementById("exportGif").onclick = exportGIF;
  document.getElementById("exportWebm").onclick = exportVideo;
  document.getElementById("exportMp4").onclick = exportMP4;
}
