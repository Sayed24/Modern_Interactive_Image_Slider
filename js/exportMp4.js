import { createFFmpeg, fetchFile } from
  "https://unpkg.com/@ffmpeg/ffmpeg@0.12.6/dist/ffmpeg.min.js";
import { exportVideo } from "./exportVideo.js";

const ffmpeg = createFFmpeg({ log: true });

export async function exportMP4() {
  if (!ffmpeg.isLoaded()) await ffmpeg.load();

  const webmBlob = await exportVideo(true);

  ffmpeg.FS("writeFile", "input.webm", await fetchFile(webmBlob));
  await ffmpeg.run("-i", "input.webm", "output.mp4");

  const data = ffmpeg.FS("readFile", "output.mp4");
  const blob = new Blob([data.buffer], { type: "video/mp4" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "slider.mp4";
  a.click();
}
