import axios, { AxiosError } from "axios";
import { IServerErrorResponse } from "../interface/error-interface";

// error를 AxiosError로 돌려주는 함수
export default function isServerError(
  error: unknown
): error is AxiosError<IServerErrorResponse> {
  return axios.isAxiosError(error);
}
