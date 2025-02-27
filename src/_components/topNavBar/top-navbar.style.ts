import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: var(--top-navbar-height);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.primaryColor};
  font-weight: 600;
  flex: 1;
  text-align: center;
  letter-spacing: 0.08rem;
`;

export const BackButton = styled.button`
  color: ${({ theme }) => theme.primaryColor};
  position: absolute;
  margin-left: auto;
`;
