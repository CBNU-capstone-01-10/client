// 로그인시 입력값
export interface ILoginParams {
  email: string;
  password: string;
}

// 회원가입시 입력 파라미터
export interface ISignupParams {
  username: string;
  alias: string;
  address: string;
  email: string;
  password: string;
  password_confirm: string;
}
// 인증받기 위한 최소한의 필드
export type IUnverifiedAccountData = Omit<ISignupParams, "password_confirm">;

// 회원가입시 응답값
export interface IRegisterResponseData {
  created_at: string;
  email: string;
  encrypted_password: string;
  id: number;
  pfp: string;
  updated_at: string;
  username: string;
}

// 이메일 인증 확인 파라미터
export interface IVerificationParams {
  userId: string;
  verificationToken: string;
}
