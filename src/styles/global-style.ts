import { createGlobalStyle, keyframes } from "styled-components";
import reset from "styled-reset";

// Global Constants
const TOP_NAVBAR_HEIGTH = "6rem";
const BTM_NAVBAR_HEIGTH = "5.5rem";

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
// 왼쪽에서부터 뒤집히며 등장하는 효과
export const swingInLeftFwd = keyframes`
  0% {
    -webkit-transform: rotateY(100deg);
            transform: rotateY(100deg);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
    -webkit-transform-origin: left;
            transform-origin: left;
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
