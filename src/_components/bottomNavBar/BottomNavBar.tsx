import styled from "styled-components";
import NavIcon from "../icon/NavIcon";
import { SlCamrecorder } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { LuBarChart3 } from "react-icons/lu";

export interface ITabContent {
  tab: string;
  path: string;
}

const Wrapper = styled.ul`
  width: 100%;
  height: 4.5rem;
  background-color: blue;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default function BottomNavBar() {
  const content = [
    { icon: SlCamrecorder, path: "/record", text: "녹화" },
    { icon: LuBarChart3, path: "/log", text: "기록" },
    { icon: FaRegUser, path: "/profile", text: "마이" },
  ];

  return (
    <Wrapper>
      {content.map((section, idx) => (
        <NavIcon
          key={idx}
          icon={section.icon}
          to={section.path}
          size="1.6rem"
          color="white"
          text={section.text}
        />
      ))}
    </Wrapper>
  );
}
