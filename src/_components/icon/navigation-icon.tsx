import { NavLink } from "react-router-dom";
import { IIconProps } from "../../interface/IconInterface";
import * as S from "./icon.style";

// 네비게이션바 아이콘
export interface INavIconProps extends IIconProps {
  to: string;
  text?: string;
}
export default function NavIcon({
  icon: Icon,
  size,
  color,
  to,
  text,
}: INavIconProps) {
  return (
    <NavLink to={to}>
      <S.IconWrapper size={size} color={color}>
        <Icon />
        <S.IconText>{text}</S.IconText>
      </S.IconWrapper>
    </NavLink>
  );
}
