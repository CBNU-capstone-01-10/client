import { useEffect, useRef, useState } from "react";
import useWatchLocation from "../../hooks/useWatchLocation";
import drawVideoSnapshot from "./_utils/drawVideoSnapshot";
import useInterval from "../../hooks/useInterval";
import LiveScoreLog from "./_components/LiveScoreLog";
import * as S from "./page.style";
import TodayScore from "./_components/today-score/today-score";
import { usePostDriverAction } from "../../api/action";
import { convertDataURLToFile } from "../../_utils/convertor";
import { SEND_DRIVER_IMAGE_INTERVAL_TIME } from "../../constants/constants";
import { getCameraPermission } from "../../_utils/camera";

const geoOptions = {
  // enableHighAccuracy: false,
  // maximumAge: 0,
  timeout: 15000,
};

// 운전자 녹화 페이지
export default function Page() {
  const [stream, setStream] = useState<MediaStream>();
  const [driverImage, setDriverImage] = useState<File>();
  const { location, cancelLocationWatch, errorMessage } =
    useWatchLocation(geoOptions);

  const videoRef = useRef<HTMLVideoElement>(null);

  const { mutate: createDriverAction, data } = usePostDriverAction();
  // POST: 일정 주기마다 운전자 행위를 캡처한 이미지와 위치 정보 전송
  useInterval(() => {
    if (videoRef.current) {
      const driverImageData = drawVideoSnapshot(videoRef.current);
      // driverImageData가 존재하면 File 객체로 변환하여 반환
      if (driverImageData) {
        const filename = `snapshot_${new Date().toISOString()}.jpg`; // 파일 이름 설정
        setDriverImage(convertDataURLToFile(driverImageData, filename));
      }

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

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    const startCameraStream = async () => {
      const driverStream = await getCameraPermission();
      setStream(driverStream);
    };

    startCameraStream();

    return () => {
      cancelLocationWatch(); // 위치 추적 해제
    };
  }, []);

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <TodayScore />
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
        <div>{errorMessage}</div>
        <LiveScoreLog newDriverAction={data?.data} />
      </S.ContentWrapper>
    </S.Wrapper>
  );
}
