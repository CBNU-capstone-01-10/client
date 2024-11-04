// COMPONENT: 상단 네비게이션 바
import * as S from "./top-navbar.style";

interface ITopNavBarProps {
  title?: string;
  height?: string;
}
export default function TopNavBar({ title }: ITopNavBarProps) {
  return (
    <S.Wrapper>
      <S.BackButton>
        <S.BackIcon />
      </S.BackButton>
      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.Wrapper>
  );
}
