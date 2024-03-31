import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <h1>MainLayout</h1>
    </>
  );
}
