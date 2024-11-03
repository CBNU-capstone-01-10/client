import styled from "styled-components";
import { IMAGE_MAP } from "../../constants/constants";

export const Container = styled.div`
  display: flex;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 2rem;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(13, 38, 76, 0.19) 0px 9px 20px;
`;
interface IScoreBarProps {
  $scoreStartValue: number;
  score: number;
}
export const ScoreBar = styled.div.attrs<IScoreBarProps>((props) => ({
  style: {
    background: `conic-gradient(
      from 0deg,
      ${props.score >= 0 ? `rgba(85,91,255,0.7)` : `rgba(240, 46, 170,0.7)`}
      ,
      ${props.score >= 0 ? `rgba(45,53,255,0.7)` : `rgba(240, 46, 170,0.8)`}
      ,
      ${props.score >= 0 ? `rgba(0,9,255,0.7)` : `rgba(240, 46, 170,0.9)`}
    )`,
  },
}))<IScoreBarProps>`
  position: relative;
  width: 19rem;
  height: 19rem;
  border-radius: 50%;
  transition: background 0.1s linear;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: "";
    position: absolute;
    width: 19rem;
    height: 19rem;
    border-radius: 50%;
    background: conic-gradient(
      transparent ${(props) => props.$scoreStartValue * 3.6}deg,
      #ffffff 0deg
    );
  }
`;

export const ScoreLabelWrapper = styled.div`
  width: 18rem;
  height: 18rem;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 100;
`;
interface IScoreLabelProps {
  label: string;
  score: number;
}
export const ScoreLabel = styled.img.attrs<IScoreLabelProps>((props) => ({
  src: IMAGE_MAP[props.label],
}))<IScoreLabelProps>`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 70%;
  height: 70%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(
    0 -1rem 4rem ${(props) => (props.score > 0 ? `rgba(8, 112, 184, 0.7)` : `rgba(240, 46, 170, 0.7)`)}
  );
  z-index: 100;
`;
