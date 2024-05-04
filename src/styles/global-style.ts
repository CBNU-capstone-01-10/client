import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// Global Constants
const NAVBAR_WIDTH = "5rem";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  /* Global Styles */
  :root {
    --top-navbar-width: ${NAVBAR_WIDTH};
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
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
