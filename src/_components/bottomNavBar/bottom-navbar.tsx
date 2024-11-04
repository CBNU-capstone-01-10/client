import NavIcon from "../icon/navigation-icon";
import { SlCamrecorder } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { LuBarChart3 } from "react-icons/lu";
import * as S from "./bottom-navbar.style";
import { SetStateAction } from "react";
import { TAB } from "../../constants/constants";

// COMPONENT: 하단 네비게이션 바
interface IBottomNavBarProps {
  setActiveTab: React.Dispatch<SetStateAction<string>>;
}
export default function BottomNavBar({ setActiveTab }: IBottomNavBarProps) {
  const content = [
    { icon: SlCamrecorder, tab: TAB.RECORD, text: "녹화" },
    { icon: LuBarChart3, tab: TAB.STATISTICS, text: "기록" },
    { icon: FaRegUser, tab: TAB.PROFILE, text: "마이" },
  ];

  return (
    <S.Wrapper>
      <S.Background>
        {content.map((section, idx) => (
          <div key={section.text} onClick={() => setActiveTab(section.tab)}>
            <NavIcon
              key={idx}
              icon={section.icon}
              size="1.4rem"
              color="black"
              text={section.text}
            />
          </div>
        ))}
      </S.Background>
    </S.Wrapper>
  );
}
