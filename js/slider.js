import { state } from "./state.js";

const slider = document.getElementById("slider");

export function renderSlider() {
  slider.innerHTML = "";

  if (!state.images.length) {
    slider.innerHTML = `<p class="empty">Upload images to start 🎞️</p>`;
    return;
  }

  const img = document.createElement("img");
  img.src = state.images[state.currentIndex];
  img.className = `slide ${state.animation}`;
  slider.appendChild(img);

  const text = state.texts[state.currentIndex];
  if (text) {
    const t = document.createElement("div");
    t.className = `slide-text ${state.textPositions[state.currentIndex] || "bottom"}`;
    t.textContent = text;
    slider.appendChild(t);
  }
}

export function nextSlide() {
  state.currentIndex = (state.currentIndex + 1) % state.images.length;
  renderSlider();
}

export function prevSlide() {
  state.currentIndex =
    (state.currentIndex - 1 + state.images.length) % state.images.length;
  renderSlider();
}
