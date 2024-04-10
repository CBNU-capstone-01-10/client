export default function drawVideoSnapshot(videoElement: HTMLVideoElement) {
  let driverImageData;
  const video = videoElement;

  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  const dpr = window.devicePixelRatio;

  canvas.width = video.width * dpr;
  canvas.height = video.height * dpr;

  if (video) {
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    driverImageData = canvas.toDataURL("image/jpeg");
  }

  return driverImageData;
}
