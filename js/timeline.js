import { state } from "./state.js";

const container = document.getElementById("timeline-container");

export function renderTimeline() {
  container.innerHTML = "";
  state.images.forEach((src, i) => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `<img src="${src}"><input type="number" value="${state.durations[i] || 0.6}" step="0.1">`;
    div.querySelector("input").onchange = e =>
      state.durations[i] = parseFloat(e.target.value);
    container.appendChild(div);
  });
}
