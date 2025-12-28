import { state } from "./state.js";

export async function exportVideoWithMusic(audioFile) {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 450;
  const ctx = canvas.getContext("2d");

  const stream = canvas.captureStream(30);
  const audio = new Audio(URL.createObjectURL(audioFile));
  const audioStream = audio.captureStream();
  audioStream.getTracks().forEach(t => stream.addTrack(t));

  const recorder = new MediaRecorder(stream);
  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);

  recorder.start();
  audio.play();

  for (let i = 0; i < state.images.length; i++) {
    await draw(ctx, state.images[i]);
    await new Promise(r => setTimeout(r, (state.durations[i] || 0.6) * 1000));
  }

  recorder.stop();
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "slider.webm";
    a.click();
  };
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
