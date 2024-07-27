// 로그인시 입력값
export interface ILoginParams {
  email: string;
  password: string;
}

// 회원가입시 입력값
export interface IAccountRegistrationData {
  username: string;
  email: string;
  password: string;
}

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
