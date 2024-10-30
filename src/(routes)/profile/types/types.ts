// 사용자 개인정보
export interface IPersonalInfo {
  pfp: {
    curr: string;
    is_default: boolean;
    user_id: number;
  };
  username: string;
  alias: string | null;
  email: string;
  address: string | null;
}
