import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import useWatchLocation from "../../hooks/useWatchLocation";

const geoOptions = {
  // enableHighAccuracy: false,
  // maximumAge: 0,
  timeout: 15000,
};
interface IUseInterval {
  (callback: () => void, interval: number): void;
}

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

  const sendPosition = () => {
    const latitude = location?.coords.latitude;
    const longitude = location?.coords.longitude;

    // 서버 전송 로직
    console.log(latitude, longitude);
  };

  // test
  useEffect(() => {
    console.log("geo");
    console.log(location);
  }, [location]);

  const drawVideoSnapshot = (videoElement: HTMLVideoElement) => {
    const video = videoElement;

    const canvas = document.createElement("canvas");

    const dpr = window.devicePixelRatio;

    const ctx = canvas.getContext("2d");
    ctx?.scale(dpr, dpr);

    if (video) {
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const driverImageData = canvas.toDataURL("image/jpeg");
      // console.log(driverImageData);

      // 이미지 전송
      socket.emit("image", driverImageData);
    }
  };

  const useInterval: IUseInterval = (callback, delay) => {
    const savedCallback = useRef<(() => void) | null>(null);

    // 콜백함수 등록
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const executeCallback = () => {
        savedCallback.current && savedCallback.current();
      };

      const timerId = setInterval(executeCallback, delay);

      return () => clearInterval(timerId);
    }, [delay]);
  };

  useInterval(() => {
    if (videoRef.current) {
      drawVideoSnapshot(videoRef.current);
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
    getCameraPermission();

    return () => {
      socket.disconnect();
      cancelLocationWatch();
    };
  }, []);

  return (
    <>
      <h1>Record</h1>
      <video
        ref={videoRef}
        id="local-video"
        width="375"
        height="280"
        autoPlay
        muted
        loop
        playsInline
      />
    </>
  );
}
