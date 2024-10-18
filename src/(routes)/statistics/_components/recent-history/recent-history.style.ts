import styled from "styled-components";

export const Header = styled.div`
  height: 3rem;
  padding: 1.2rem;
  position: sticky;
  top: 0;
  background: white;
  border-radius: 2rem;
`;

// 최근 점수 기록 컴포넌트의 전체 래퍼
export const RecentHistoryContainer = styled.div`
  padding: 0 1rem;
  width: 100%;
  height: calc(100% - 3rem);
  overflow: auto;
  border-radius: 2rem;
`;

// 최근 점수 기록 컴포넌트의 전체 래퍼
export const RecentHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

// 각 기록 항목을 감싸는 래퍼
export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
`;

interface IRecentDriverActionItemProps {
  score: number;
}
// 색상이 있는 원형 도형
export const HistoryIcon = styled.div<IRecentDriverActionItemProps>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  margin-right: 3rem;
  background-color: ${({ score, theme }) =>
    score < 0 ? theme.primaryCautionBgColor : theme.primaryColor};
`;

// 날짜와 시간을 표시하는 텍스트
export const RecordedAt = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

// 점수를 감싸는 래퍼
export const ScoreWrapper = styled.div<IRecentDriverActionItemProps>`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ score, theme }) =>
    score < 0 ? theme.primaryCautionBgColor : theme.primaryColor};
  margin-left: auto;
`;
