import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 1070px) and (min-height: 1785px) {
    flex-direction: row;
    align-items: center;
  }
`;
export const RecentSevenDaysScoreWrapper = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 1070px) and (min-height: 1785px) {
    margin-bottom: 1rem;
  }
`;
export const ChartHeader = styled.div`
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;
// export const Title = styled.div`
//   font-size: 1rem;
//   letter-spacing: -0.05rem;
// `;
export const TotalScore = styled.div`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.4rem;
  font-weight: bold;
`;
