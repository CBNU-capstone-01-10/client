import axios, { AxiosError } from "axios";
import { ServerErrorResponse } from "../interface/error-interface";

// error를 AxiosError로 돌려주는 함수
export default function isServerError(
  error: unknown
): error is AxiosError<ServerErrorResponse> {
  return axios.isAxiosError(error);
}
