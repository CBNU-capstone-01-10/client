import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  /* padding: var(--top-navbar-height) 0 8rem; */
  padding: 1rem 0 8rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
`;
