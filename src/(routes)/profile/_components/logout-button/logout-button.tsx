import { useNavigate } from "react-router";
import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import * as S from "./logout-button.style";
import { useLogout } from "../../../../api/account";
import { useEffect } from "react";

// COMPONENT: 로그아웃 버튼
export default function LogoutButton() {
  const navigate = useNavigate();
  const { mutate: logout, isSuccess: isLogoutSuccess } = useLogout();

  // HANDLER: 로그아웃
  const handleLogout = async () => {
    logout();
  };

  // ROUTE: 로그아웃 성공
  useEffect(() => {
    if (isLogoutSuccess) {
      navigate("/signin");
    }
  }, [isLogoutSuccess, navigate]);

  return (
    <ContentBlockWrapper>
      <S.Button onClick={() => handleLogout()}>로그아웃</S.Button>
    </ContentBlockWrapper>
  );
}
