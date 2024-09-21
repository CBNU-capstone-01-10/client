import * as S from "../personal-info/personal-info.style";
import { useGetPersonalInfo } from "../../../../api/profile";
import LoadingErrorIcon from "../../../../_components/icon/loading-error-icon";

// COMPONENT: 사용자 개인정보
export default function PersonalInfo() {
  const { data: personalInfoData, isLoading, isError } = useGetPersonalInfo();
  if (isError || !personalInfoData) {
    return <LoadingErrorIcon color="red" size="3rem" />;
  }
  const { pfp, username, alias, email, address } = personalInfoData;

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
    <S.PersonalInfoWrapper>
      <div>
        <S.ProfilePicture src={pfp} alt="프로필 사진" />
        <div>
          <S.UserName>{username}</S.UserName>
          <S.UserAlias>{alias}</S.UserAlias>
        </div>
      </div>
      <S.UserEmail>{email}</S.UserEmail>
      <S.UserAddress>{address}</S.UserAddress>
    </S.PersonalInfoWrapper>
  );
}
