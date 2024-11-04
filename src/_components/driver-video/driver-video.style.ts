import styled from "styled-components";

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
