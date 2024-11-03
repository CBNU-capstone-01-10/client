import styled from "styled-components";

// 드래그 가능한 VideoWrapper 스타일 컴포넌트
export const VideoWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 20%;
  height: fit-content;
  margin: 0.8rem 0;
  z-index: 200;
`;

export const VideoElement = styled.video`
  border-radius: 0.5rem;
  width: 100%;
  display: block;
  margin: 0 auto;
  transform: scaleX(-1); /* 좌우반전 */
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: calc(var(--top-navbar-height) - 2rem) 1rem 0 1rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
