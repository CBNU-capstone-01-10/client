import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import * as S from "./driver-video.style";
import usePollingInterval from "../../hooks/usePollingInterval";
import drawVideoSnapshot from "../../(routes)/record/_utils/drawVideoSnapshot";
import { SEND_DRIVER_IMAGE_INTERVAL_TIME } from "../../constants/constants";
import { usePostDriverAction } from "../../api/action";
import useWatchLocation from "../../hooks/useWatchLocation";
import { getCameraPermission } from "../../_utils/camera";

/**
 * COMPONENT: 운전자 모습을 녹화하는 비디오
 * - 고정 간격 폴링으로 초기 렌더링 지연 영향 최소화
 * - Fire-and-Forget 패턴으로 이전 요청 완료 대기 없이 새 요청 발송
 */
export default forwardRef<HTMLVideoElement>(function DriverVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { location } = useWatchLocation();
  const { mutate: createDriverAction } = usePostDriverAction();
  const [isReady, setIsReady] = useState(false);

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

  // 비디오 준비 상태 감지
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsReady(true);
    };

    // 이미 준비된 상태인지 확인
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setIsReady(true);
    }

    video.addEventListener("canplay", handleCanPlay);
    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [stream]);

  // 폴링 콜백 함수
  const captureAndSendFrame = useCallback(async () => {
    const video = videoRef.current;

    // 비디오가 준비되지 않았으면 스킵
    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return;
    }

    // 위치 정보가 없으면 스킵
    if (!location) {
      return;
    }

    try {
      const driverImageBlob = await drawVideoSnapshot(video);
      if (!driverImageBlob) {
        return;
      }

      const filename = `snapshot_${new Date().toISOString()}.jpg`;
      const driverImage = new File([driverImageBlob as BlobPart], filename, {
        type: "image/jpeg",
      });

      const { latitude, longitude } = location.coords;

      const driverActionData = new FormData();
      driverActionData.append("capture", driverImage);
      driverActionData.append("location_x", latitude.toString());
      driverActionData.append("location_y", longitude.toString());

      // Fire-and-Forget: 응답을 기다리지 않음
      createDriverAction(driverActionData);
    } catch (error) {
      console.error("비디오 프레임 캡처 오류:", error);
    }
  }, [createDriverAction, location]);

  // 고정 간격 폴링 (비디오 준비 후 활성화)
  usePollingInterval(captureAndSendFrame, SEND_DRIVER_IMAGE_INTERVAL_TIME, {
    enabled: isReady && !!location,
    waitForPrevious: false, // Fire-and-Forget 모드
  });

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
