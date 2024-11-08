import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: var(--top-navbar-height) 1rem 0 1rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
  overflow: auto;
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: calc(var(--btm-navbar-height) + 3rem);
`;
