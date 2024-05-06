import styled from "styled-components";

export const LiveScoreLogWrapper = styled.div`
  width: 100%;
  height: 28rem;
  padding: 1rem;
  background-color: #2f3c78;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;
export const LiveScoreLogItem = styled.div`
  width: 100%;
  height: 4.5rem;
  background-color: #1e2b67;
  margin-bottom: 0.5rem;
  padding: 1rem 1rem 1rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 2.5rem;
  border: 1px solid rgba(255 255 255 / 0.7);
  box-shadow: 1rem;
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const Content = styled.div`
  width: 100%;
  color: white;
`;
export const ElapsedTime = styled.div`
  color: rgba(255 255 255 / 0.7);
  width: 100%;
  font-size: 0.8rem;
`;
export const Score = styled.div`
  width: 8rem;
  height: 2.5rem;
  margin-left: 1rem;
  border-radius: 2.5rem;
  border: 1px solid rgba(255 255 255 / 0.7);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;
