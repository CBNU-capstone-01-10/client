import styled from "styled-components";
import LoginStatus from "./LoginStatus";
import LogoutStatus from "./LogoutStatus";

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: var(--top-navbar-width);
  background-color: blue;
`;
export default function TopNavBar() {
  return (
    <>
      <Wrapper>
        <LoginStatus />
        {/* {isLoggedIn ? <LoginStatus /> : <LogoutStatus />} */}
      </Wrapper>
    </>
  );
}
