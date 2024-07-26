import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useWatchLocation from "../../hooks/useWatchLocation";
import drawVideoSnapshot from "./_utils/drawVideoSnapshot";
import useInterval from "../../hooks/useInterval";
import LiveScoreLog from "./_components/LiveScoreLog";
import * as S from "./page.style";
import TodayScore from "./_components/today-score/today-score";

const geoOptions = {
  // enableHighAccuracy: false,
  // maximumAge: 0,
  timeout: 15000,
};

export default function Page() {
  const socket = io();
  const [stream, setStream] = useState<MediaStream>();

  const { location, cancelLocationWatch, errorMessage } =
    useWatchLocation(geoOptions);

  const videoRef = useRef<HTMLVideoElement>(null);

  const getCameraPermission = useCallback(async () => {
    try {
      const driverStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setStream(driverStream);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // WS: 서버 전송
  const sendLocation = useCallback(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      socket.emit("location", { latitude, longitude });
    }
  }, [location, socket]);

  useInterval(() => {
    if (videoRef.current) {
      const driverImage = drawVideoSnapshot(videoRef.current);
      socket.emit("image", driverImage);
    }
  }, 2000);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    // 위치가 변경될 때마다 서버에 위치를 전송
    if (location) {
      sendLocation();
    }
  }, [location, sendLocation]);

  useEffect(() => {
    getCameraPermission();

    return () => {
      socket.disconnect();
      cancelLocationWatch();
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
        <LiveScoreLog />
      </S.ContentWrapper>
    </S.Wrapper>
  );
}
