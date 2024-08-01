import { Outlet } from "react-router";
import TopNavBar from "../_components/topNavBar/TopNavBar";

export default function SignupLayout() {
  return (
    <>
      <TopNavBar title={"회원가입"} height={"7rem"} />
      <Outlet />
    </>
  );
}
