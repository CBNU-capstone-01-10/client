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
  text-align: center;
  height: ${(props) => props.height || "var(--top-navbar-height)"};
`;
export const Background = styled.nav`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.primaryColor};
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
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
