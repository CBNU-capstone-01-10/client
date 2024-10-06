import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: calc(var(--top-navbar-height) - 2rem) 1rem var(--btm-navbar-height)
    1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryBgColor};
`;
