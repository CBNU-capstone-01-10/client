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
  width: 94%;
  height: 100%;
  background-color: white;
  padding: 1.4rem 0;
  margin: 0 auto 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: rgba(13, 38, 76, 0.19) 0px 9px 20px;
  border-radius: 2rem;
`;
