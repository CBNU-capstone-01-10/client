import { Outlet } from "react-router";
import BottomNavBar from "../_components/bottomNavBar/BottomNavBar";

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <BottomNavBar />
    </>
  );
}
