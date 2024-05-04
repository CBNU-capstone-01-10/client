import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useWatchLocation from "../../hooks/useWatchLocation";
import drawVideoSnapshot from "./_utils/drawVideoSnapshot";
import useInterval from "../../hooks/useInterval";
import styled from "styled-components";

const geoOptions = {
  // enableHighAccuracy: false,
  // maximumAge: 0,
  timeout: 15000,
};

const Wrapper = styled.div`
  width: 100%;
  padding-top: var(--top-navbar-width);
`;
const VideoWrapper = styled.div`
  width: 100%;
`;
const VideoElement = styled.video`
  width: 100%;
  display: block;
  margin: 0 auto;
`;

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

  const sendPosition = useCallback(() => {
    const latitude = location?.coords.latitude;
    const longitude = location?.coords.longitude;

    // 서버 전송 로직
    console.log(latitude, longitude);
  }, [location]);

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
      sendPosition();
    }
  }, [location, sendPosition]);

  useEffect(() => {
    getCameraPermission();

    return () => {
      socket.disconnect();
      cancelLocationWatch();
    };
  }, []);

  return (
    <Wrapper>
      <VideoWrapper>
        <VideoElement
          ref={videoRef}
          id="local-video"
          autoPlay
          muted
          loop
          playsInline
        />
      </VideoWrapper>
      <div>{errorMessage}</div>
    </Wrapper>
  );
}
