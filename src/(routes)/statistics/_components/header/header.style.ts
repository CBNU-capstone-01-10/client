import styled from "styled-components";

export const MyScoreWrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
`;
export const MyScoreTitle = styled.div`
  color: black;
  font-weight: 600;
`;
export const MyScore = styled.div`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.8rem;
  font-weight: 600;
`;
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: lightgray;
`;
export const MetadataWrapper = styled.div``;
