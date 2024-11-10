// COMPONENT: 코인 lottie 로고
import Lottie from "lottie-react";
import coinLottie from "../../assets/lottie/coin-lottie.json";

interface ICoinLogoProps {
  height?: string;
}
export default function CoinLottieLogo({ height }: ICoinLogoProps) {
  return <Lottie animationData={coinLottie} style={{ height }} loop={false} />;
}
