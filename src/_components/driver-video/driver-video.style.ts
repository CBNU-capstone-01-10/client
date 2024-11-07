import styled from "styled-components";

export const VideoWrapper = styled.div`
  width: 100%;
  height: fit-content;
  z-index: 200;
`;

export const VideoElement = styled.video`
  border-radius: 0.2rem;
  width: 100%;
  display: block;
  margin: 0 auto;
  transform: scaleX(-1); /* 좌우반전 */
`;
