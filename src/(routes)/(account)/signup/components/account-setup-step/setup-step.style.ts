import styled from "styled-components";

// 페이지 래퍼
export const SetupPageWrapper = styled.div`
  height: 100%;
  padding: 8rem 1rem 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;
// 인풋박스
export const Input = styled.input`
  width: 100%;
  height: 3.6rem;
  border-radius: 1rem;
  padding: 0 1.6rem;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.primaryBgColor};
  font-size: 1rem;
  border: none;
  outline: none;
  &:hover {
    outline: 1px solid ${({ theme }) => theme.primaryColor};
  }
`;
// 다음 버튼
export const NextBtn = styled.button`
  width: 100%;
  height: 3.6rem;
  margin: 1rem;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 1rem;
  font-size: 1rem;
  color: white;
  /* position: fixed; */
  bottom: 4rem;
`;
// 상호작용 버튼 (이메일 전송, 인증 코드 확인 등)
interface IInteractionBtnProps {
  width?: string;
}
export const InteractionBtn = styled.button<IInteractionBtnProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.8rem;
  margin: auto 0;
  width: ${(props) => props.width || "auto"};
  height: 2.4rem;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: white;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 1rem;
  &:hover {
    border: var(--secondary-color);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
