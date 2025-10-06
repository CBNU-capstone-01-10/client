import { useCallback, useEffect, useRef } from "react";

/**
 * HOOK: 콜백함수를 중첩 setTimeout으로 주기적으로 수행 (리렌더링 최적화)
 * @param callback - 실행할 콜백 함수
 * @param delay - 지연 시간 (밀리초)
 * @param immediate - 즉시 실행 여부 (기본값: false)
 * @returns start, stop, restart 함수들을 포함한 객체
 */
export default function useSetTimeout(
  callback: () => void,
  delay: number,
  immediate: boolean = false
) {
  const savedCallback = useRef<(() => void) | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef<boolean>(false);
  const delayRef = useRef<number>(delay);

  // delay 값 업데이트
  delayRef.current = delay;

  // 콜백함수 등록
  savedCallback.current = callback;

  // 중첩 setTimeout 실행 함수 (한 번만 생성)
  const scheduleNext = useCallback(() => {
    if (!isActiveRef.current || !savedCallback.current) {
      return;
    }

    timeoutIdRef.current = setTimeout(() => {
      if (savedCallback.current && isActiveRef.current) {
        savedCallback.current();
        scheduleNext(); // 재귀적으로 다음 setTimeout 예약
      }
    }, delayRef.current);
  }, []); // 의존성 배열 비움

  // 타이머 시작 (한 번만 생성)
  const start = useCallback(() => {
    if (isActiveRef.current) {
      return; // 이미 실행 중이면 무시
    }

    isActiveRef.current = true;

    if (immediate && savedCallback.current) {
      savedCallback.current();
    }

    scheduleNext();
  }, [scheduleNext, immediate]);

  // 타이머 정지 (한 번만 생성)
  const stop = useCallback(() => {
    isActiveRef.current = false;
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  // 타이머 재시작 (한 번만 생성)
  const restart = useCallback(() => {
    stop();
    start();
  }, [start, stop]);

  // 컴포넌트 마운트 시 자동 시작 (한 번만 실행)
  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, []);

  return { start, stop, restart, isActive: isActiveRef.current };
}
