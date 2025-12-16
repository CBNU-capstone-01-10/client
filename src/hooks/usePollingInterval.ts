import { useCallback, useEffect, useRef } from "react";

/**
 * HOOK: 고정 간격 폴링을 위한 훅
 * - 이전 요청의 완료 여부와 관계없이 고정된 간격으로 콜백 실행
 * - 중복 실행 방지를 위한 락(lock) 메커니즘 내장
 * - 초기 렌더링 지연의 영향을 받지 않음
 * 
 * @param callback - 실행할 비동기 콜백 함수
 * @param interval - 폴링 간격 (밀리초)
 * @param options - 추가 옵션
 */
interface UsePollingIntervalOptions {
  /** 즉시 실행 여부 (기본값: false) */
  immediate?: boolean;
  /** 활성화 여부 (기본값: true) */
  enabled?: boolean;
  /** 이전 요청 완료 대기 여부 (기본값: false - fire-and-forget) */
  waitForPrevious?: boolean;
}

export default function usePollingInterval(
  callback: () => Promise<void> | void,
  interval: number,
  options: UsePollingIntervalOptions = {}
) {
  const { 
    immediate = false, 
    enabled = true,
    waitForPrevious = false 
  } = options;

  const savedCallback = useRef<typeof callback>(callback);
  const intervalIdRef = useRef<number | null>(null);
  const isProcessingRef = useRef(false);
  const isMountedRef = useRef(true);

  // 콜백 함수 최신 상태 유지
  savedCallback.current = callback;

  // 안전한 콜백 실행 함수
  const executeCallback = useCallback(async () => {
    // 언마운트 상태면 실행하지 않음
    if (!isMountedRef.current) {
      return;
    }

    // waitForPrevious가 true이고 이전 요청이 진행 중이면 스킵
    if (waitForPrevious && isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    try {
      await savedCallback.current();
    } catch (error) {
      console.error("폴링 콜백 실행 오류:", error);
    } finally {
      isProcessingRef.current = false;
    }
  }, [waitForPrevious]);

  // 폴링 시작
  const start = useCallback(() => {
    if (intervalIdRef.current !== null) {
      return; // 이미 실행 중
    }

    // setInterval 사용으로 고정 간격 보장
    intervalIdRef.current = window.setInterval(() => {
      executeCallback();
    }, interval);

    // 즉시 실행 옵션
    if (immediate) {
      executeCallback();
    }
  }, [executeCallback, immediate, interval]);

  // 폴링 중지
  const stop = useCallback(() => {
    if (intervalIdRef.current !== null) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  // 폴링 재시작
  const restart = useCallback(() => {
    stop();
    start();
  }, [start, stop]);

  // 마운트/언마운트 처리
  useEffect(() => {
    isMountedRef.current = true;

    if (enabled) {
      start();
    }

    return () => {
      isMountedRef.current = false;
      stop();
    };
  }, [enabled, start, stop]);

  // interval 변경 시 재시작
  useEffect(() => {
    if (enabled && intervalIdRef.current !== null) {
      restart();
    }
  }, [interval, enabled, restart]);

  return { 
    start, 
    stop, 
    restart,
    isProcessing: isProcessingRef.current 
  };
}
