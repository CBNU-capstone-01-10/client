import styled from "styled-components";

export const LiveScoreLogWrapper = styled.div`
  width: 100%;
  height: 60%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  overflow-y: auto;
  padding-bottom: var(--btm-navbar-height);
`;
export const LiveScoreLogItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5rem;
  padding: 1rem;
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1rem;
`;
export const Content = styled.div`
  width: 100%;
  color: black;
`;
export const ElapsedTime = styled.div`
  color: black;
  width: 100%;
  font-size: 0.8rem;
`;
interface IScoreProps {
  score?: number;
}
export const ScoreWrapper = styled.div<IScoreProps>`
  width: 8rem;
  height: 2.5rem;
  margin-left: 1rem;
  border-radius: 0.8rem;
  margin: auto;
  border: 1px solid
    ${({ score, theme }) =>
      (score as number) < 0 ? theme.primaryCautionBgColor : theme.primaryColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ score, theme }) =>
    (score as number) < 0 ? theme.primaryCautionBgColor : theme.primaryColor};
`;
