import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const Form = styled.form`
  /* width: 100%; */
`;
export const PersonalInfoWrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
`;
export const PfpWrapper = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
`;
export const PfpImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.6rem;
  overflow: hidden;
`;
export const Pfp = styled.img`
  width: 100%;
  height: 100%;
`;
export const FileInput = styled.input`
  visibility: hidden;
  display: none;
`;
export const HiddenUploadBtn = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: black;
`;
export const FileDeleteBtn = styled.button`
  width: 3.6rem;
  height: 2.2rem;
  background-color: #f0f3fa;
  border-radius: 0.6rem;
  font-weight: 900;
  color: red;
  float: right;
`;
export const Input = styled.input`
  outline-color: ${({ theme }) => theme.primaryColor};
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0 1rem;
  outline: none;
  width: 100%;
  height: 2rem;
  margin: 0.2rem 0;
`;
export const Label = styled.label`
  color: black;
  font-size: 0.9rem;
  margin: 0.3rem 0.5rem;
`;
export const UserName = styled.div`
  color: black;
  font-weight: 600;
  width: 100%;
`;
export const UserAlias = styled.div`
  color: black;
  font-weight: 600;
  width: 100%;
`;
export const UserAddress = styled.div`
  color: black;
  font-weight: 600;
  width: 100%;
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 1rem;
`;
export const CancelButton = styled.button`
  width: fit-content;
  padding: 0.5rem 1rem;
  height: 2.4rem;
  background-color: #f0f3fa;
  border-radius: 0.6rem;
  font-weight: 900;
  font-size: 0.9rem;
  color: ${({ theme }) => theme};
`;
export const CompleteButton = styled.button`
  width: fit-content;
  padding: 0.5rem 1rem;
  height: 2.4rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  font-weight: 900;
  background-color: ${({ theme }) => theme.primaryColor};
  color: #f0f3fa;
`;
