import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

interface IUseInterval {
  (callback: () => void, interval: number): void;
}

export default function Page() {
  const socket = io();
  const [stream, setStream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const getCameraPermission = async () => {
    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setStream(myStream);
    } catch (e) {
      console.log(e);
    }
  };

  const drawVideoSnapshot = (videoElement: HTMLVideoElement) => {
    const video = videoElement;
    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");
    // ctx?.scale(dpr, dpr);

    if (video) {
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");

      // 이미지 전송
      socket.emit("image", imageData);
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
  }, 5000);

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
    };
  }, []);

  return (
    <>
      <h1>Record</h1>
      <video
        ref={videoRef}
        id="local-video"
        width="375"
        height=""
        autoPlay
        muted
        loop
        playsInline
      />
    </>
  );
}
