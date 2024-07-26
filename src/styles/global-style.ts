import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// Global Constants
const TOP_NAVBAR_HEIGTH = "10rem";
const BTM_NAVBAR_HEIGTH = "5.5rem";

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
    font-family: Arial, sans-serif;
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
