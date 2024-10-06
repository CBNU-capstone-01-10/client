import * as S from "./page.style";
import LogoutButton from "./_components/logout-button/logout-button";
import PersonalInfo from "./_components/personal-info/personal-info";
import ContentBlockWrapper from "../../_components/block/content-block-wrapper";

// PAGE: 프로필 페이지
export default function Page() {
  return (
    <S.Wrapper>
      <PersonalInfo />
      <LogoutButton />
    </S.Wrapper>
  );
}
