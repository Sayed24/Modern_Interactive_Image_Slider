import { state } from "./state.js";
import { renderSlider } from "./slider.js";
import { pushHistory } from "./history.js";

export function setupText() {
  document.getElementById("textInput").oninput = e => {
    state.texts[state.current] = e.target.value;
    pushHistory();
    renderSlider();
  };

  document.getElementById("textPosition").onchange = e => {
    state.positions[state.current] = e.target.value;
    pushHistory();
    renderSlider();
  };
}
