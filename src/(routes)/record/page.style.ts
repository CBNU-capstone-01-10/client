import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: var(--top-navbar-height) 1rem 8rem 1rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
`;
