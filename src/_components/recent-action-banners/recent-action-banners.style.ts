import { swingInLeftFwd } from "./../../styles/global-style";
import styled from "styled-components";
import { IMAGE_MAP } from "../../constants/constants";

export const Container = styled.section`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;
export const DefaultTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1rem 0;
  height: 10%;
`;
export const ActionBanner = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 2rem;
  background-color: #fff;
  box-shadow: rgba(13, 38, 76, 0.19) 0px 9px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  &:first-child {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }
  &:not(:first-child) {
    padding: 0.8rem;
    filter: grayscale(50%);
    animation: ${swingInLeftFwd} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      both;
  }
`;
interface IScoreLabelProps {
  label: string | null;
  score: number;
  safeDriving: boolean;
}
export const ActionBannerImage = styled.img.attrs<IScoreLabelProps>(
  (props) => ({
    src: props.safeDriving
      ? IMAGE_MAP["safe_driving"]
      : IMAGE_MAP[props.label || ""],
  })
)<IScoreLabelProps>`
  width: 55%;
  height: 55%;
  display: block;

  filter: drop-shadow(0 1rem 2.5rem rgba(0, 0, 0, 0.7));
  z-index: 100;
`;

export const ActionBannerMetadata = styled.span`
  font-size: 1.2rem;
`;
