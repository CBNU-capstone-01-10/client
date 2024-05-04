import { Outlet } from "react-router";
import BottomNavBar from "../_components/bottomNavBar/BottomNavBar";
import TopNavBar from "../_components/topNavBar/TopNavBar";

export default function MainLayout() {
  return (
    <>
      <TopNavBar />
      <Outlet />
      <BottomNavBar />
    </>
  );
}
