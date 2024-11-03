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
    background: `conic-gradient(${props.score >= 0 ? "#007bff" : "#ff4d4d"} ${
      props.$scoreStartValue * 3.6
    }deg, #ededed 0deg)`,
  },
}))<IScoreBarProps>`
  position: relative;
  width: 18.5rem;
  height: 18.5rem;
  border-radius: 50%;
  transition: background 0.1s linear;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: "";
    position: absolute;
    width: 16.5rem;
    height: 16.5rem;
    border-radius: 50%;
    background-color: #fff;
  }
`;

interface IScoreLabelProps {
  label: string;
}
export const ScoreLabel = styled.span<IScoreLabelProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${(props) => IMAGE_MAP[props.label]});
  background-size: cover;
  background-position: center;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  z-index: 100;
`;
