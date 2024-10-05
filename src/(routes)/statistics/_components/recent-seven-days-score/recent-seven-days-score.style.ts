import styled from "styled-components";

export const RecentSevenDaysScoreWrapper = styled.div`
  padding: 1rem;
`;
export const ChartHeader = styled.div`
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const Title = styled.div`
  font-size: 1rem;
  letter-spacing: -0.05rem;
`;
export const TotalScore = styled.div`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.4rem;
  font-weight: bold;
`;
