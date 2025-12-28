import { state } from "./state.js";
import { renderSlider } from "./slider.js";

export function setupTextOverlay() {
  document.getElementById("slide-text").oninput = e => {
    state.texts[state.currentIndex] = e.target.value;
    renderSlider();
  };

  document.getElementById("text-position").onchange = e => {
    state.textPositions[state.currentIndex] = e.target.value;
    renderSlider();
  };
}
