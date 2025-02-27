// PAGE: 녹화 화면
import { useEffect, useRef, useState } from "react";
import useWatchLocation from "../../hooks/useWatchLocation";
import drawVideoSnapshot from "./_utils/drawVideoSnapshot";
import useInterval from "../../hooks/useInterval";
import { usePostDriverAction } from "../../api/action";
import { convertDataURLToFile } from "../../_utils/convertor";
import {
  ACTION_LABEL,
  ActionLabel,
  geoOptions,
  SEND_DRIVER_IMAGE_INTERVAL_TIME,
} from "../../constants/constants";
import { getCameraPermission } from "../../_utils/camera";
import * as S from "./page.style";
import DriverVideo from "../../_components/driver-video/driver-video";
import AlertBanner from "../../_components/alert-banner/alert-banner";
import RecentActionBanners from "./_components/recent-action-banners/recent-action-banners";
import Notification from "../../_components/notification/notification";

export default function Page() {
  const [stream, setStream] = useState<MediaStream>();
  const [driverImage, setDriverImage] = useState<File>();
  const { location, cancelLocationWatch, locationErrorMessage } =
    useWatchLocation(geoOptions);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastNotificationIdRef = useRef<number | null>(null);

  const [notificationData, setNotificationData] = useState({
    key: "",
    message: "",
    description: "",
  });

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

  // 주변 운전자 위험 행위 탐지
  useEffect(() => {
    if (newDriverActionFeedback) {
      const latestNearDriverUnsafeAction =
        newDriverActionFeedback.nearUnsafeActions?.[0];
      if (
        latestNearDriverUnsafeAction?.id &&
        latestNearDriverUnsafeAction.id !== lastNotificationIdRef.current
      ) {
        lastNotificationIdRef.current = latestNearDriverUnsafeAction.id;
        setNotificationData({
          key: latestNearDriverUnsafeAction.id.toString(),
          message: `주변 운전자 ${
            ACTION_LABEL[latestNearDriverUnsafeAction.label as ActionLabel]
          } 행위 감지`,
          description: `방어 운전하세요!`,
        });
      }
    }
  }, [newDriverActionFeedback]);

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

    return () => {
      cancelLocationWatch(); // 위치 추적 해제
    };
  }, []);

  return (
    <S.Wrapper>
      {/* 촬영 화면 */}
      <DriverVideo ref={videoRef} />
      {/* 최근 운전 행위 결과 배너 */}
      <RecentActionBanners />
      {/* 위치 정보 에러 배너 */}
      {locationErrorMessage && (
        <AlertBanner errorMessage={locationErrorMessage} />
      )}
      {/* 에러 배너 */}
      {error && <AlertBanner error={error} />}
      {/* 근처 운전자 위험 운전 행위 알림 */}
      <Notification
        key={notificationData.key}
        message={notificationData.message}
        description={notificationData.description}
      />
    </S.Wrapper>
  );
}
