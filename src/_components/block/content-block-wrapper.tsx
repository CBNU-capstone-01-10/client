import { ReactNode } from "react";
import * as S from "./content-block-wrapper.style";

// COMPONENT: 컨텐츠를 담는 기본 박스형 래퍼
interface IContentBlockWrapperProps {
  children: ReactNode;
  height: string;
}
export default function ContentBlockWrapper({
  children,
  height,
}: IContentBlockWrapperProps) {
  return <S.Wrapper height={height}>{children}</S.Wrapper>;
}
