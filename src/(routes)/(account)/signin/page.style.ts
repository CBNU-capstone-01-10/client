import styled from "styled-components";

export const FormWrapper = styled.form`
  width: 100vw;
  height: 100vh;
  background-color: var(--main-bg-color);
  transition: all 2s;
  padding: 3rem;
  padding-top: var(--top-navbar-height);
  padding-bottom: var(--btm-navbar-height);
`;

export const FormContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
`;

export const Header = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.3rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  margin-bottom: 1.25rem;
  padding: 0 2rem;
  background-color: rgba(235, 235, 235, 0.5);
  border: none;
  border-radius: 2rem;
  &:focus {
    outline-color: var(--primary-color);
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
  background-color: var(--primary-color);
  border-radius: 2rem;
  color: white;
  font-size: 1.125rem;
  letter-spacing: 0.05em;
  &:focus {
    outline-color: var(--primary-color);
  }
  &:disabled {
    background-color: rgba(77, 134, 156, 0.8);
  }
`;

export const SignupHeader = styled.div`
  width: 100%;
  margin-top: 1.2rem;
  font-size: 0.9rem;
  text-align: center;
`;

export const SignupButton = styled.button`
  width: 100%;
  height: 3.5rem;
  letter-spacing: 0.05em;
  color: var(--primary-color);
`;
