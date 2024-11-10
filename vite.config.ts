import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost+1-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost+1.pem")),
    },
    proxy: {
      "/api": {
        target: "https://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
