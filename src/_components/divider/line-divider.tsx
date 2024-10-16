import * as S from "./line-divider.style";

// COMPONENT: 라인 구분자
type LineDividerProps = {
  height?: string;
  verticalMargin?: string;
};
export default function LineDivider({
  height,
  verticalMargin,
}: LineDividerProps) {
  return <S.LineDivider height={height} verticalMargin={verticalMargin} />;
}
