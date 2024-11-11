// PAGE: 운전자 녹화 페이지
import { useEffect, useRef, useState } from "react";
import useWatchLocation from "../../hooks/useWatchLocation";
import drawVideoSnapshot from "./_utils/drawVideoSnapshot";
import useInterval from "../../hooks/useInterval";
import { usePostDriverAction } from "../../api/action";
import { convertDataURLToFile } from "../../_utils/convertor";
import { SEND_DRIVER_IMAGE_INTERVAL_TIME } from "../../constants/constants";
import { getCameraPermission } from "../../_utils/camera";
import { useDriverActionsStore } from "../../store/use-driver-actions";
import * as S from "./page.style";
import DriverVideo from "../../_components/driver-video/driver-video";
import AlertBanner from "../../_components/alert-banner/alert-banner";
import RecentActionBanners from "./_components/recent-action-banners/recent-action-banners";

const geoOptions = {
  enableHighAccuracy: true,
  // maximumAge: 0,
  timeout: 15000,
};

export default function Page() {
  const [stream, setStream] = useState<MediaStream>();
  const [driverImage, setDriverImage] = useState<File>();
  const { location, cancelLocationWatch, locationErrorMessage } =
    useWatchLocation(geoOptions);
  const { addDriverAction } = useDriverActionsStore();

  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    mutate: createDriverAction,
    data: newDriverActionFeedback,
    error,
  } = usePostDriverAction();
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
    if (newDriverActionFeedback) {
      addDriverAction(newDriverActionFeedback.action);
    }
  }, [newDriverActionFeedback, addDriverAction]);

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
      <DriverVideo ref={videoRef} />
      <RecentActionBanners />
      {locationErrorMessage && (
        <AlertBanner errorMessage={locationErrorMessage} />
      )}
      {error && <AlertBanner error={error} />}
    </S.Wrapper>
  );
}
