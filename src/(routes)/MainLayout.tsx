import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

export interface ITabContent {
  tab: string;
  path: string;
}
export default function MainLayout() {
  const content = [
    { tab: "Record", path: "/record" },
    { tab: "Log", path: "/log" },
    { tab: "Profile", path: "/profile" },
  ];

  return (
    <>
      <Outlet />
      {content.map((section, idx) => (
        <ul key={idx}>
          <NavLink to={section.path}>{section.tab}</NavLink>
        </ul>
      ))}
    </>
  );
}
