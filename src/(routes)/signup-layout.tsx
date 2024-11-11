import { Outlet } from "react-router";
import TopNavBar from "../_components/topNavBar/top-navbar";
import styled from "styled-components";
import NavIcon from "../_components/icon/navigation-icon";
import { MdHomeFilled } from "react-icons/md";
import { Link } from "react-router-dom";

const HomeBtn = styled.div`
  position: absolute;
  top: 3rem;
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
      <TopNavBar title={"회원가입"} height={"10rem"} />
      <HomeBtn>
        <Link to={"/"}>
          <NavIcon icon={MdHomeFilled} size="1.6rem" color="grey" />
        </Link>
      </HomeBtn>
      <Outlet />
    </>
  );
}
