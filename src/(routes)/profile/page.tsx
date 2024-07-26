import * as S from "./page.style";
import LogoutButton from "./_components/logout-button/logout-button";

// PAGE: 프로필 페이지
export default function Page() {
  return (
    <S.Wrapper>
      <LogoutButton>로그아웃</LogoutButton>
    </S.Wrapper>
  );
}
