import { state } from "./state.js";
import { saveImage } from "./storage.js";
import { renderSlider, nextSlide, prevSlide } from "./slider.js";
import { renderTimeline } from "./timeline.js";
import { exportAsGIF } from "./export.js";
import { exportVideoWithMusic } from "./exportVideo.js";

export function setupUI() {

  document.getElementById("next").onclick = nextSlide;
  document.getElementById("prev").onclick = prevSlide;

  document.getElementById("animation").onchange = e => {
    state.animation = e.target.value;
    renderSlider();
  };

  document.getElementById("theme").onchange = e => {
    document.body.className = e.target.value;
    localStorage.setItem("theme", e.target.value);
  };

  document.getElementById("file-input").onchange = e => {
    [...e.target.files].forEach(file => {
      saveImage(file);
      state.images.push(URL.createObjectURL(file));
    });
    renderSlider();
    renderTimeline();
  };

  document.getElementById("exportGif").onclick = exportAsGIF;

  document.getElementById("exportVideo").onclick = () => {
    const audio = document.getElementById("music-file").files[0];
    if (audio) exportVideoWithMusic(audio);
  };
}
