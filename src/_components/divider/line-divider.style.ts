import styled from "styled-components";

// props를 활용하여 height를 동적으로 설정
export const LineDivider = styled.div<{ height?: string }>`
  width: 100%;
  height: ${(props) => props.height || "0.5px"}; // height가 없으면 기본값 1px
  background-color: #ebf0fa;
  margin: 0.6rem 0;
`;
