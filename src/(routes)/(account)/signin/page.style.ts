import styled from "styled-components";

export const FormWrapper = styled.form`
  width: 100vw;
  height: 100vh;
  transition: all 2s;
  padding: var(--top-navbar-height) 3rem var(--btm-navbar-height) 3rem;
`;

export const FormContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

export const Header = styled.header`
  width: 9rem;
  height: 3rem;
  margin: 3.6rem 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  text-align: center;
  line-height: 220%;
`;
export const HeaderTitle = styled.h1`
  font-size: 1.6rem;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.3rem;
  font-weight: 600;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.3rem;
`;
export const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 2rem;
  margin: 0.6rem 0;
  border: none;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.primaryBgColor};
  &:focus {
    outline-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 1.2rem;
  color: white;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  &:focus {
    outline-color: ${({ theme }) => theme.primaryColor};
  }
  &:disabled {
    background-color: rgba(77, 134, 156, 0.8);
  }
`;

export const SignupHeader = styled.div`
  width: 100%;
  margin-top: 1.2rem;
  font-size: 0.85rem;
  text-align: center;
`;

export const SignupButton = styled.button`
  width: 100%;
  height: 3.5rem;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.primaryColor};
`;
