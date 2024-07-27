import styled from "styled-components";

export const FormWrapper = styled.form`
  width: 100vw;
  height: 100%;
  background-color: var(--main-bg-color);
  transition: all 2s;
  padding-top: var(--top-navbar-height);
  padding-bottom: calc(var(--btm-navbar-height) + 2rem);
`;

export const FormContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  margin-bottom: 1rem;
  text-align: center;
`;

export const Title = styled.h3`
  font-size: 1.4rem;
  letter-spacing: 0.05em;
  margin-top: 1rem;
`;

export const InputContainer = styled.div`
  width: 85%;
`;
export const HiddenInput = styled.input`
  display: none;
`;
export const FileButton = styled.button``;
export const Label = styled.div`
  font-size: 0.9rem;
  margin: 0.8rem 0.5rem 0.6rem;
`;

export const CoupleInputContainer = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
`;
export const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0rem 2rem;
  margin-bottom: 0.5rem;
  background-color: rgba(229, 231, 235, 0.5);
  border: none;
  border-radius: 2rem;
  &:focus {
    outline-color: var(
      --primary-color
    ); /* Assuming --primary-color is defined in your CSS */
  }
`;

export const VerificationBtn = styled.button`
  width: ${(props) => props.width || "auto"};
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: white;
  background-color: var(--primary-color);
  border-radius: 2rem;
  &:hover {
    border: var(--secondary-color);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--secondary-color);
  font-size: 0.9rem;
`;
// export const SuccessMessage = styled.span`
//   color: green;
// `;
export const IdCheckMessage = styled.span`
  color: lightseagreen;
  font-weight: bold;
  font-size: 0.9rem;
`;
export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 2rem;
  height: 3.5rem;
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: white;
  background-color: var(--primary-color);
  border-radius: 1.5rem;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
export const RecaptchaContainer = styled.div`
  margin: 1rem auto 0;
  display: table;
`;
export const GotoLogin = styled.div`
  font-size: 0.9rem;
  text-align: center;
`;
export const GotoLoginBtn = styled.button`
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: var(--primary-color);
`;
