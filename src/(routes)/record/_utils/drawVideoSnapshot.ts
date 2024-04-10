export default function drawVideoSnapshot(videoElement: HTMLVideoElement) {
  let driverImageData;
  const video = videoElement;

  const canvas = document.createElement("canvas");

  const dpr = window.devicePixelRatio;

  const ctx = canvas.getContext("2d");
  ctx?.scale(dpr, dpr);

  if (video) {
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const driverImageData = canvas.toDataURL("image/jpeg");
    console.log(driverImageData);
  }
  return driverImageData;
}
