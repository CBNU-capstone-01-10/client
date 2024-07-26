import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: calc(var(--top-navbar-height) - 2rem) 1rem 0 1rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export const VideoWrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0.8rem 0;
`;
export const VideoElement = styled.video`
  border-radius: 1.5rem;
  width: 100%;
  display: block;
  margin: 0 auto;
`;
