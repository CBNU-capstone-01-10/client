// COMPONENT: 왕눈이 lottie 로고
import Lottie from "lottie-react";
import wangnooniLottie from "../../assets/lottie/wangnooni-lottie.json";
interface ILottieLogoProps {
  height?: string;
}
export default function WangnooniLottieLogo({ height }: ILottieLogoProps) {
  return <Lottie animationData={wangnooniLottie} style={{ height }} />;
}
