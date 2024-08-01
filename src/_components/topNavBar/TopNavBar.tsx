import * as S from "./styles/TopNavBar.style";

// COMPONENT: 상단 네비게이션 바
interface ITopNavBarProps {
  title?: string;
  height?: string;
}
export default function TopNavBar({ title, height }: ITopNavBarProps) {
  return (
    <S.Wrapper height={height}>
      <S.Background>
        <S.HeaderTitle>{title}</S.HeaderTitle>
      </S.Background>
    </S.Wrapper>
  );
}
