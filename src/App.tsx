import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./router";
import axios from "axios";
import { setupMockForRegister, disableMock } from "../mock/account";
import { setupMockForActions } from "../mock/action";

// 환경 변수 기반 목업 활성화
if (import.meta.env.VITE_ENABLE_MOCK === "true") {
  // 목업 설정 활성화
  setupMockForRegister();
  setupMockForActions();
} else {
  disableMock(); // 목업 설정 비활성화
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  axios.defaults.withCredentials = true;
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
