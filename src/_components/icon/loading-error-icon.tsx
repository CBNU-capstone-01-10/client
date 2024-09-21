import { MdErrorOutline } from "react-icons/md";
import * as S from "./icon.style";

// 로딩 에러 아이콘
export interface LoadingErrorIconProps {
  size: string;
  color: string;
}
export default function LoadingErrorIcon({
  size,
  color,
}: LoadingErrorIconProps) {
  return (
    <S.IconWrapper size={size} color={color}>
      <MdErrorOutline />
      <S.IconText>정보를 불러오는 데 실패했습니다.</S.IconText>
    </S.IconWrapper>
  );
}
