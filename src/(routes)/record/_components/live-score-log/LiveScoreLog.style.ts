import styled from "styled-components";
import { scaleInCenter } from "../../../../styles/global-style";

export const LiveScoreLogWrapper = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  overflow-y: auto;
  padding: 1rem 1rem var(--btm-navbar-height);
`;
export const LiveScoreLogItem = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: rgba(13, 38, 76, 0.19) 0px 9px 20px;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  height: 5rem;
  padding: 1rem 1.5rem 1rem;
  gap: 1rem;
  animation: ${scaleInCenter} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export const ScoreWrapper = styled.div<IScoreProps>`
  width: 8rem;
  height: 2.5rem;
  margin-left: 1rem;
  border-radius: 0.8rem;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ score, theme }) =>
      (score as number) < 0 ? theme.primaryCautionBgColor : theme.primaryColor};
  color: ${({ score, theme }) =>
    (score as number) < 0 ? theme.primaryCautionBgColor : theme.primaryColor};
  font-weight: 600;
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-left: 0.8rem;
`;
export const Label = styled.div`
  width: 75%;
  color: black;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  padding-top: 0.3rem;
`;
export const ElapsedTime = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: black;
  font-size: 0.8rem;
  text-align: right;
`;
interface IScoreProps {
  score?: number;
}
