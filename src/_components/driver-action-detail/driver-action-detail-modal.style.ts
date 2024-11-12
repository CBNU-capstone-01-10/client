import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  gap: 0.8rem;
`;
export const ImageWrapper = styled.div`
  width: 100%;
  height: 16rem;
`;
export const CapturedImage = styled.img`
  width: 100%;
  height: fit-content;
  background-color: black;
  border-radius: 0.5rem;
`;
export const LabelScoreWrapper = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Label = styled.h2`
  font-weight: bold;
  letter-spacing: 0.01rem;
`;
interface IScoreProps {
  score?: number;
}
export const Score = styled.div<IScoreProps>`
  letter-spacing: 0.05rem;
  /* width: 3rem; */
  min-width: 3rem;
  padding: 0 1rem;
  text-align: center;
  line-height: 2rem;
  height: 2rem;
  font-weight: bold;
  color: ${({ score, theme }) =>
    (score as number) < 0 ? theme.primaryCautionBgColor : theme.primaryColor};
  border: 2px solid
    ${({ score, theme }) =>
      (score as number) < 0 ? theme.primaryCautionBgColor : theme.primaryColor};
  border-radius: 1rem;
`;

export const LineWrapper = styled.div`
  width: 100%;
  height: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const IconWrapper = styled.div`
  width: 2rem;
  height: 100%;
  margin-right: 0.6rem;
`;
export const LocationIcon = styled(IoLocationOutline)`
  margin: auto;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.primaryColor};
`;
export const RecordedAtIcon = styled(AiOutlineClockCircle)`
  margin: auto;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.primaryColor};
`;
export const CloseButton = styled.button`
  border: 1px solid lightgrey;
  border-radius: 1rem;
  width: 3.5rem;
  height: 2.2rem;
  margin-left: auto;
`;
