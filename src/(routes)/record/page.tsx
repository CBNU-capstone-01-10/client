import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

interface IUseInterval {
  (callback: () => void, interval: number): void;
}

export default function Page() {
  const socket = io();
  const [stream, setStream] = useState<MediaStream>();
  const [geoLocPosition, setGeoLocPosition] = useState<number[]>([0, 0]);
  const [geoLocWatchId, setGeoLocWatchId] = useState();

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

  const geoOptions = {
    // enableHighAccuracy: false,
    // maximumAge: 0,
    timeout: 15000,
  };

  const markPosition = (pos: GeolocationPosition) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    if (latitude !== null && longitude !== null) {
      setGeoLocPosition([latitude, longitude]);
    }

    console.log(latitude, longitude);
  };

  const showErrorMsg = (error: GeolocationPositionError) => {
    console.log(error.code);
    console.log(error.PERMISSION_DENIED);
    try {
      if (error.code === error.PERMISSION_DENIED) {
        console.log("요청거부");
      }
      if (error.code === error.POSITION_UNAVAILABLE) {
        console.log("위치정보 사용불가");
      }
      if (error.code === error.TIMEOUT) {
        console.log("요청시간초과");
      }
    } catch (e) {
      console.log("알 수 없는 에러");
    } finally {
      console.log("위치정보 수집에 따른 부가적인 알림을 확인할 수 없습니다.");
    }
  };

  const getGPSPermission = async () => {
    try {
      const id = navigator.geolocation.watchPosition(
        // getCurrentPosition 버전
        // navigator.geolocation.getCurrentPosition(
        markPosition,
        showErrorMsg,
        geoOptions
      );
      console.log(id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("geo");
    console.log(geoLocPosition);
  }, [geoLocPosition]);

  const drawVideoSnapshot = (videoElement: HTMLVideoElement) => {
    const video = videoElement;

    const canvas = document.createElement("canvas");

    const dpr = window.devicePixelRatio;

    const ctx = canvas.getContext("2d");
    ctx?.scale(dpr, dpr);

    if (video) {
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      // console.log(imageData);

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
  }, 2000);

  // getCurrentPosition 버전
  // useInterval(() => {
  //   if (geoLocPosition) {
  //     markPosition(geoLocPosition);
  //   }
  // }, 2000);

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
    getGPSPermission();

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
        height="280"
        autoPlay
        muted
        loop
        playsInline
      />
    </>
  );
}
