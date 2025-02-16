import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/global-style";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import setupLocatorUI from "@locator/runtime";

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme.light}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
