import { state } from "./state.js";
import { renderSlider } from "./slider.js";
import { pushHistory } from "./history.js";

const timeline = document.getElementById("timeline");

export function renderTimeline() {
  timeline.innerHTML = "";

  state.images.forEach((img, i) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.draggable = true;
    item.dataset.index = i;

    item.innerHTML = `
      <img src="${img}">
      <input type="number" step="0.1" value="${state.durations[i] || 0.6}">
    `;

    item.ondragstart = e => e.dataTransfer.setData("from", i);
    item.ondragover = e => e.preventDefault();

    item.ondrop = e => {
      const from = +e.dataTransfer.getData("from");
      const to = i;
      reorder(from, to);
      pushHistory();
      renderTimeline();
      renderSlider();
    };

    item.querySelector("input").oninput = e =>
      state.durations[i] = +e.target.value;

    timeline.appendChild(item);
  });
}

function reorder(from, to) {
  ["images", "texts", "positions", "durations"].forEach(key => {
    const arr = state[key];
    const item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);
  });
}
