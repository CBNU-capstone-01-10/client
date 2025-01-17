import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./router";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "./api/axios-instance";
import setupMocks from "../mock/index";

// 개발용: MOCKUP
const mock = new MockAdapter(axiosInstance);
// 환경 변수 기반 목업 활성화
if (import.meta.env.VITE_ENABLE_MOCK === "true") {
  // 목업 설정 활성화
  Object.values(setupMocks).forEach((setupMock) => setupMock(mock));
  console.log(
    "Axios Mock Adapter가 활성화되어 axios 요청을 가로챌 준비가 되었습니다."
  );
} else {
  mock.restore();
  console.log("Axios Mock Adapter가 비활성화 되었습니다.");
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
