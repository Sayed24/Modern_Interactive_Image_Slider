import { state } from "./state.js";

export async function exportVideo(returnBlob = false) {
  return new Promise(async resolve => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 450;
    const ctx = canvas.getContext("2d");

    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.start();

    for (let i = 0; i < state.images.length; i++) {
      await draw(ctx, state.images[i]);
      await wait((state.durations[i] || 0.6) * 1000);
    }

    recorder.stop();

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      if (returnBlob) resolve(blob);
      else download(blob);
    };
  });
}

function draw(ctx, src) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, 800, 450);
      ctx.drawImage(img, 0, 0, 800, 450);
      res();
    };
    img.src = src;
  });
}

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function download(blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "slider.webm";
  a.click();
}
