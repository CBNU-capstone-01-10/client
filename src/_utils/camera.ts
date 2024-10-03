/**
 * 운전자의 카메라 허용을 요청하는 함수
 * @returns driverStream
 */
export const getCameraPermission = async () => {
  try {
    const driverStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    return driverStream;
  } catch (e) {
    console.log(e);
  }
};
