import { useState, useEffect, useRef } from "react";
import { geoOptions } from "../constants/constants";

/**
 * HOOK: 기기 위치정보 조회
 */
export default function useWatchLocation() {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>();
  // watchPosition의 반환 id 저장
  const locationWatchId = useRef<number>(0);

  // watchPosition 성공시 실행하는 핸들러
  const handleSuccess = (pos: GeolocationPosition) => {
    setLocation(pos);
  };

  // watchPosition 실패시 실행하는 핸들러
  const handleError = (error: GeolocationPositionError) => {
    if (error.code === error.PERMISSION_DENIED) {
      setLocationErrorMessage("요청거부");
    }
    if (error.code === error.POSITION_UNAVAILABLE) {
      setLocationErrorMessage("위치정보 사용불가");
    }
    if (error.code === error.TIMEOUT) {
      setLocationErrorMessage("위치 정보를 확인하는 데 실패했습니다.");
    }
  };

  // watchPosition의 id 삭제
  const cancelLocationWatch = () => {
    const { geolocation } = navigator;

    if (locationWatchId.current && geolocation) {
      geolocation.clearWatch(locationWatchId.current);
    }
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // Geolocation API로 위치 감지 시작
    locationWatchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      geoOptions
    );

    // UNMOUNT
    return cancelLocationWatch;
  }, []);

  return { location, cancelLocationWatch, locationErrorMessage };
}
