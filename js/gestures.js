import { nextSlide, prevSlide } from "./slider.js";

export function enableSwipe(el) {
  let startX = 0;
  el.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });
  el.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();
  });
}
