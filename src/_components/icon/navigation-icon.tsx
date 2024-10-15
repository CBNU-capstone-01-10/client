import { IIconProps } from "../../interface/IconInterface";
import * as S from "./icon.style";

// COMPONENT: 네비게이션바 아이콘
export interface INavIconProps extends IIconProps {
  text?: string;
}
export default function NavIcon({
  icon: Icon,
  size,
  color,
  text,
}: INavIconProps) {
  return (
    <S.IconWrapper size={size} color={color}>
      <Icon />
      <S.IconText>{text}</S.IconText>
    </S.IconWrapper>
  );
}
