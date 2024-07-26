import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: var(--top-navbar-height);
`;
export const Background = styled.nav`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.primaryColor};
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
`;
