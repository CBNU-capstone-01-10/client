// HOOK: 콜백함수를 주기적으로 수행
import { useEffect, useRef } from "react";

export default function (callback: () => void, delay: number): void {
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
}
