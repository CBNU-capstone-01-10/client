import * as S from "./content-block-wrapper.style";

export default function ContentBlockWrapper({ children, height }) {
  return <S.Wrapper height={height}>{children}</S.Wrapper>;
}
