import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode }) => {
  // 환경변수 로드
  const env = loadEnv(mode, process.cwd());

  const sslCertName = env.VITE_SSL_CERT_NAME;
  const proxyProtocol = env.VITE_API_PROTOCOL;
  const proxyHost = env.VITE_API_HOST;
  const proxyPort = env.VITE_API_PORT;

  return {
    plugins: [react()],
    server: {
      host: true,
      // 로컬 환경에서만 적용
      https: {
        key: fs.readFileSync(path.resolve(__dirname, `${sslCertName}-key.pem`)),
        cert: fs.readFileSync(path.resolve(__dirname, `${sslCertName}.pem`)),
      },
      proxy: {
        "/api": {
          target: `${proxyProtocol}://${proxyHost}:${proxyPort}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
          ws: true,
        },
      },
    },
  };
});
