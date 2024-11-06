import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: var(--top-navbar-height) 1rem 0 1rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
