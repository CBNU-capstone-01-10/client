import { createGlobalStyle, keyframes } from "styled-components";
import reset from "styled-reset";

// Global Constants
const TOP_NAVBAR_HEIGTH = "6rem";
const BTM_NAVBAR_HEIGTH = "5rem";

// KEYFRAMES
// 펄스 효과
export const pulsateFwd = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
`;
// 스케일인 효과
export const scaleInCenter = keyframes`
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${reset}

  /* Global Styles */
  :root {
    --top-navbar-height: ${TOP_NAVBAR_HEIGTH};
    --btm-navbar-height: ${BTM_NAVBAR_HEIGTH};
  }
  
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;
