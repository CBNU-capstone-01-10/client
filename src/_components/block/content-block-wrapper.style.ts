import styled from "styled-components";
interface WrapperProps {
  height?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: ${(props) => props.height || "5rem"};
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
`;
