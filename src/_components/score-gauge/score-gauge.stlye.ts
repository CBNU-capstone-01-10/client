import styled from "styled-components";
import { DEG_ROTATE_PER_SEC, IMAGE_MAP } from "../../constants/constants";
import { pulsateFwd } from "../../styles/global-style";

export const DefaultTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1rem 0;
  height: 10%;
`;
interface IScoreBarProps {
  $scoreStartValue: number;
  score: number;
}

export const ScoreBar = styled.div.attrs<IScoreBarProps>((props) => ({
  style: {
    background: `conic-gradient(
      from 0deg,
      ${
        props.score >= 0
          ? props.score === 0
            ? "rgba(255, 215, 0, 1)"
            : "rgba(85, 91, 255, 0.7)"
          : "rgba(240, 46, 170,1)"
      },
      ${
        props.score >= 0
          ? props.score === 0
            ? "rgba(255, 215, 0, 1)"
            : "rgba(45, 53, 255, 0.7)"
          : "rgba(240, 46, 170, 1)"
      },
      ${
        props.score >= 0
          ? props.score === 0
            ? "rgba(255, 215, 0, 1)"
            : "rgba(0, 9, 255, 0.7)"
          : "rgba(240, 46, 170,1)"
      }
    )`,
  },
}))<IScoreBarProps>`
  position: relative;
  width: 18.9rem;
  height: 18.9rem;
  @media (min-width: 1070px) and (min-height: 1785px) {
    width: 45rem;
    height: 45rem;
  }

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
    @media (min-width: 1070px) and (min-height: 1785px) {
      width: 45.1rem;
      height: 45.1rem;
    }
    border-radius: 50%;
    transition: background 0.1s linear;
    background: ${(props) =>
      `conic-gradient(
        transparent ${props.$scoreStartValue * DEG_ROTATE_PER_SEC}deg,
        rgba(199, 200, 204, 0.8) 0deg
      )`};
  }
`;

export const ScoreLabelWrapper = styled.div`
  width: 18rem;
  height: 18rem;
  @media (min-width: 1070px) and (min-height: 1785px) {
    width: 44.1rem;
    height: 44.1rem;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 100;
`;

interface IScoreLabelProps {
  label: string | null;
  score: number;
  safe_driving: boolean;
}

export const ScoreLabelImage = styled.img.attrs<IScoreLabelProps>((props) => ({
  src: props.safe_driving
    ? IMAGE_MAP["safe_driving"]
    : IMAGE_MAP[props.label || ""],
}))<IScoreLabelProps>`
  width: 55%;
  height: 55%;
  margin-bottom: 3rem;
  filter: drop-shadow(
    0 -1rem 4rem ${(props) => (props.score > 0 ? `rgba(8, 112, 184, 0.7)` : `rgba(240, 46, 170, 0.7)`)}
  );
  transform-origin: top left;
  animation: ${pulsateFwd} 0.5s ease-in-out infinite both;
  z-index: 100;
`;

export const ScoreLabelTitle = styled.h1`
  position: absolute;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;
