import { forwardRef, useEffect, useRef, useState } from "react";
import * as S from "./driver-video.style";
import useSetTimeout from "../../hooks/useSetTimeout";
import drawVideoSnapshot from "../../(routes)/record/_utils/drawVideoSnapshot";
import { SEND_DRIVER_IMAGE_INTERVAL_TIME } from "../../constants/constants";
import { usePostDriverAction } from "../../api/action";
import useWatchLocation from "../../hooks/useWatchLocation";
import { getCameraPermission } from "../../_utils/camera";

/**
 * COMPONENT: 운전자 모습을 녹화하는 비디오
 */
export default forwardRef<HTMLVideoElement>(function DriverVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { location } = useWatchLocation();
  const { mutate: createDriverAction } = usePostDriverAction();

  const [stream, setStream] = useState<MediaStream>();

  // 녹화 화면 초기화
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // MOUNT: 녹화 허용 요청과 스트림 등록
  useEffect(() => {
    const startCameraStream = async () => {
      const driverStream = await getCameraPermission();
      setStream(driverStream);
    };

    startCameraStream();
  }, []);

  useSetTimeout(async () => {
    // POST: 일정 주기마다 운전자 행위를 캡처한 이미지와 위치 정보 전송
    if (videoRef.current) {
      const driverImageBlob = await drawVideoSnapshot(videoRef.current);
      if (!driverImageBlob) {
        return;
      }

      const filename = `snapshot_${new Date().toISOString()}.jpg`;
      const driverImage = new File([driverImageBlob as BlobPart], filename, {
        type: "image/jpeg",
      });

      if (driverImage && location) {
        const { latitude, longitude } = location.coords;

        const driverActionData = new FormData();
        driverActionData.append("capture", driverImage);
        driverActionData.append("location_x", latitude.toString());
        driverActionData.append("location_y", longitude.toString());
        createDriverAction(driverActionData);
      }
    }
  }, SEND_DRIVER_IMAGE_INTERVAL_TIME);

  return (
    <S.VideoWrapper>
      <S.VideoElement
        ref={videoRef}
        id="local-video"
        autoPlay
        muted
        loop
        playsInline
      />
    </S.VideoWrapper>
  );
});
