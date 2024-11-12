import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem 1rem var(--btm-navbar-height) 1rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
  overflow: auto;
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: calc(var(--btm-navbar-height) + 3rem);
`;
export const Title = styled.div`
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.05rem;
`;
