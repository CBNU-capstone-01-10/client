import { useState, useEffect, useRef } from "react";

export default function useWatchLocation(geoOptions = {}) {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [errorMessage, setErrorMessage] = useState<string>();
  // watchPosition의 반환 id 저장
  const locationWatchId = useRef<number>(0);

  // watchPosition 성공시 실행하는 핸들러
  const handleSuccess = (pos: GeolocationPosition) => {
    setLocation(pos);
  };

  // watchPosition 실패시 실행하는 핸들러
  const handleError = (error: GeolocationPositionError) => {
    if (error.code === error.PERMISSION_DENIED) {
      setErrorMessage("요청거부");
    }
    if (error.code === error.POSITION_UNAVAILABLE) {
      setErrorMessage("위치정보 사용불가");
    }
    if (error.code === error.TIMEOUT) {
      setErrorMessage("요청시간초과");
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

    // Clear the location watch instance when React unmounts the used component
    return cancelLocationWatch;
  }, [geoOptions]);

  return { location, cancelLocationWatch, errorMessage };
}
