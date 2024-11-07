import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(var(--btm-navbar-height) + 0.8rem);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0.8rem;
  z-index: 200;
`;
export const Container = styled.nav`
  width: 94%;
  height: fit-content;
  background-color: white;
  padding: 1.4rem 0;
  margin: 0 auto 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: rgba(13, 38, 76, 0.19) 0px 9px 20px;
  border-radius: 2rem;
`;
