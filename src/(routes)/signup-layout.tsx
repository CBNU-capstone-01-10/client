import { Outlet } from "react-router";
import TopNavBar from "../_components/topNavBar/TopNavBar";
import styled from "styled-components";
import NavIcon from "../_components/icon/navigation-icon";
import { MdHomeFilled } from "react-icons/md";

const HomeBtn = styled.div`
  position: absolute;
  top: 3.6rem;
  left: 2.8rem;
  width: 2rem;
  height: 2rem;
  :hover {
    cursor: pointer;
  }
`;

export default function SignupLayout() {
  return (
    <>
      <TopNavBar title={"회원가입"} height={"7rem"} />
      <HomeBtn>
        <NavIcon icon={MdHomeFilled} size="1.6rem" color="white" to="/" />
      </HomeBtn>
      <Outlet />
    </>
  );
}
