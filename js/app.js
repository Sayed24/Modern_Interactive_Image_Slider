import { initDB, getImages } from "./storage.js";
import { state } from "./state.js";
import { renderSlider } from "./slider.js";
import { setupUI } from "./ui.js";
import { enableSwipe } from "./gestures.js";
import { renderTimeline } from "./timeline.js";
import { setupTextOverlay } from "./text.js";

async function init() {
  await initDB();
  const imgs = await getImages();
  state.images = imgs.map(b => URL.createObjectURL(b));

  document.body.className = localStorage.getItem("theme") || "dark";

  renderSlider();
  renderTimeline();
  setupTextOverlay();
  setupUI();
  enableSwipe(document.getElementById("slider"));

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
}

init();
