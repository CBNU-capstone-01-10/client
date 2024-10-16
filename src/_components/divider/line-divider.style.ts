import styled from "styled-components";

export const LineDivider = styled.div<{
  height?: string;
  verticalMargin?: string;
}>`
  width: 100%;
  height: ${(props) => props.height || "0.5px"}; // height가 없으면 기본값 1px
  background-color: #ebf0fa;
  margin: ${(props) => props.verticalMargin || "0.6rem"} 0;
`;
