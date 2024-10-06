import * as S from "./page.style";
import LogoutButton from "./_components/logout-button/logout-button";
import PersonalInfo from "./_components/personal-info/personal-info";

// PAGE: 프로필 페이지
export default function Page() {
  return (
    <S.PageWrapper>
      <PersonalInfo />
      <LogoutButton />
    </S.PageWrapper>
  );
}
