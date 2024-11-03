import styled from "styled-components";

interface IWrapperProps {
  height?: string;
}
export const Wrapper = styled.div<IWrapperProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: ${(props) => props.height || "var(--top-navbar-height)"};
  text-align: center;
`;
export const Background = styled.nav`
  width: 100%;
  height: 100%;
  /* background-color: ${({ theme }) => theme.primaryColor}; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const HeaderTitle = styled.h1`
  font-size: 1.4rem;
  color: white;
  position: absolute;
  font-weight: 600;
  margin-top: 2rem;
`;
