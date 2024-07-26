import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: var(--bottom-navbar-height);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;
export const Background = styled.nav`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 1.4rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
`;
