// COMPONENT: 로그아웃 버튼
import { useNavigate } from "react-router";
import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import * as S from "./logout-button.style";
import { useLogout } from "../../../../api/account";
import { useEffect } from "react";
import { useResetAllStore } from "../../../../store/use-reset-all-store";

export default function LogoutButton() {
  const navigate = useNavigate();
  // DELETE: 로그아웃
  const resetAllGlobalState = useResetAllStore();
  const { mutate: logout, isSuccess: isLogoutSuccess } = useLogout();
  // HANDLER: 로그아웃
  const handleLogout = async () => {
    resetAllGlobalState();
    logout();
  };

  // ROUTE: 로그아웃 성공
  useEffect(() => {
    if (isLogoutSuccess) {
      navigate("/");
    }
  }, [isLogoutSuccess, navigate]);

  return (
    <ContentBlockWrapper>
      <S.Button onClick={() => handleLogout()}>로그아웃</S.Button>
    </ContentBlockWrapper>
  );
}
