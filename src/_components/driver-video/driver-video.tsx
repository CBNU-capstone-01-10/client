// COMPONENT: 운전자 모습을 녹화하는 비디오
import { forwardRef } from "react";
import * as S from "./driver-video.style";

export default forwardRef<HTMLVideoElement>(function DriverVideo(_, ref) {
  return (
    <S.VideoWrapper>
      <S.VideoElement
        ref={ref}
        id="local-video"
        autoPlay
        muted
        loop
        playsInline
      />
    </S.VideoWrapper>
  );
});
