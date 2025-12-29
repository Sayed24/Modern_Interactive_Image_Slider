import { state } from "./state.js";

export function exportGIF() {
  gifshot.createGIF(
    { images: state.images, interval: 0.6 },
    res => {
      if (!res.error) {
        const a = document.createElement("a");
        a.href = res.image;
        a.download = "slider.gif";
        a.click();
      }
    }
  );
}
