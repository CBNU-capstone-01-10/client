import NavIcon from "../icon/navigation-icon";
import { SlCamrecorder } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { LuBarChart3 } from "react-icons/lu";
import * as S from "./BottomNavBar.style";

// COMPONENT: 하단 네비게이션 바
export default function BottomNavBar() {
  const content = [
    { icon: SlCamrecorder, path: "/record", text: "녹화" },
    { icon: LuBarChart3, path: "/log", text: "기록" },
    { icon: FaRegUser, path: "/profile", text: "마이" },
  ];

  return (
    <S.Wrapper>
      <S.Background>
        {content.map((section, idx) => (
          <NavIcon
            key={idx}
            icon={section.icon}
            to={section.path}
            size="1.4rem"
            color="black"
            text={section.text}
          />
        ))}
      </S.Background>
    </S.Wrapper>
  );
}
