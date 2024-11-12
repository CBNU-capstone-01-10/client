import styled from "styled-components";

export const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: fit-content;
  z-index: 200;
`;

export const VideoElement = styled.video`
  visibility: hidden;
  @media (min-width: 1070px) and (min-height: 1785px) {
    visibility: visible;
  }
  border-radius: 0.2rem;
  width: 100%;
  display: block;
  margin: 0 auto;
  transform: scaleX(-1); /* 좌우반전 */
`;
