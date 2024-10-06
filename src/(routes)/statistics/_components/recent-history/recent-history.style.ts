import styled from "styled-components";

export const Header = styled.div`
  height: 3rem;
  padding: 1.2rem;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
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

// 왼쪽의 색상이 있는 원형 아이콘
export const HistoryIcon = styled.div<{ color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 3rem;
`;

// 날짜와 시간을 표시하는 텍스트
export const RecordedAt = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

// 점수를 감싸는 래퍼
export const ScoreWrapper = styled.div<{ score: number }>`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ score }) => (score >= 0.0 ? "#2B6CB0" : "#FF0000")};
  margin-left: auto;
`;