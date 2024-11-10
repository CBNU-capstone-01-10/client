// 사용자 개인정보
export interface IPersonalInfo {
  pfp: {
    curr: string;
    is_default: boolean;
    user_id: number;
  };
  username: string;
  encrypted_password: string;
  alias: string | null;
  email: string;
  address: string | null;
  id: number;
  created_at: string;
  updated_at: string;
}
