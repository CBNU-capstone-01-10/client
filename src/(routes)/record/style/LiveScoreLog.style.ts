import styled from "styled-components";

export const LiveScoreLogWrapper = styled.div`
  width: 100%;
  height: calc(50% - var(--btm-navbar-height));
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  overflow-y: auto;
  padding: 1rem 0.2rem var(--btm-navbar-height) 0.2rem;
`;
export const LiveScoreLogItem = styled.div`
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 4px;
  border-radius: 1rem;
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
