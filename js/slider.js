import { state } from "./state.js";

const slider = document.getElementById("slider");

export function renderSlider() {
  slider.innerHTML = "";

  if (!state.images.length) {
    slider.innerHTML = "<p>No images uploaded</p>";
    return;
  }

  const img = document.createElement("img");
  img.src = state.images[state.current];
  img.className = `slide ${state.animation}`;
  slider.appendChild(img);

  if (state.texts[state.current]) {
    const t = document.createElement("div");
    t.className = `slide-text ${state.positions[state.current] || "bottom"}`;
    t.textContent = state.texts[state.current];
    slider.appendChild(t);
  }
}

export function next() {
  state.current = (state.current + 1) % state.images.length;
  renderSlider();
}

export function prev() {
  state.current =
    (state.current - 1 + state.images.length) % state.images.length;
  renderSlider();
}
