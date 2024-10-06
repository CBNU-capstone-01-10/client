import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: calc(var(--top-navbar-height) - 2rem) 1rem var(--btm-navbar-height)
    1rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
