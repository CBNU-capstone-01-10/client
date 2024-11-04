import styled from "styled-components";

interface IWrapperProps {
  width?: string;
  top?: string;
  left?: string;
}
export const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  top: ${({ top }) => top || "2rem"};
  left: ${({ left }) => left || "50%"};
  transform: translate(-50%, -50%);
  width: ${({ width }) => width || "fit-content"};
  text-align: center;
  white-space: nowrap;
`;
