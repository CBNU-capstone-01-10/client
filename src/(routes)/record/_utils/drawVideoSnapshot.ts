/**
 * video 요소를 바탕으로 canvas로 이미지 그려 반환하는 함수
 * @param videoElement 비디오 요소를 담은 HTML 요소
 * @returns 운전자 이미지 데이터
 */
export default function drawVideoSnapshot(videoElement: HTMLVideoElement) {
  let driverImageData;
  const video = videoElement;
  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = video.videoWidth * dpr;
  canvas.height = video.videoHeight * dpr;

  if (video) {
    // 스케일 및 변환 설정: X 축을 -1로 설정하여 좌우 반전
    ctx.scale(-1, 1); // X 축 좌우 반전
    ctx.translate(-canvas.width, 0); // 반전된 이미지를 올바른 위치에 맞추기 위해 translate 사용
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    driverImageData = canvas.toDataURL("image/jpeg");
  }

  return driverImageData;
}
