import { initDB, loadImages } from "./storage.js";
import { state } from "./state.js";
import { renderSlider } from "./slider.js";
import { renderTimeline } from "./timeline.js";
import { setupText } from "./text.js";
import { setupUI } from "./ui.js";
import { enableSwipe } from "./gestures.js";
import { pushHistory } from "./history.js";

async function init() {
  await initDB();

  const files = await loadImages();
  state.images = files.map(f => URL.createObjectURL(f));

  document.body.className = localStorage.getItem("theme") || "dark";

  pushHistory();
  renderSlider();
  renderTimeline();
  setupText();
  setupUI();
  enableSwipe(document.getElementById("slider"));

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
}

init();
