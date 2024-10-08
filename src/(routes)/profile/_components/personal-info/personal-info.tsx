import * as S from "../personal-info/personal-info.style";
import { useGetPersonalInfo } from "../../../../api/profile";
import LoadingErrorIcon from "../../../../_components/icon/loading-error-icon";
import PersonalInfoForm from "../personal-info-form/personal-info-form";
import { useState } from "react";
import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import LineDivider from "../../../../_components/divider/line-divider";
import OvalLoadingSpinner from "../../../../_components/loading-spinner/oval-loading-spinner";

// COMPONENT: 사용자 개인정보를 담은 컨테이너
export default function PersonalInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // GET: 사용자 개인정보
  const {
    data: personalInfoData,
    isLoading,
    isError,
    isSuccess,
  } = useGetPersonalInfo();

  // ERROR
  if (isError || !personalInfoData) {
    return (
      <S.ComponentWrapper>
        <ContentBlockWrapper height={"fit-content"}>
          <LoadingErrorIcon color="red" size="3rem" />
        </ContentBlockWrapper>
      </S.ComponentWrapper>
    );
  }
  // LOADING
  if (isLoading) {
    return (
      <S.ComponentWrapper>
        <ContentBlockWrapper height={"fit-content"}>
          <OvalLoadingSpinner />
        </ContentBlockWrapper>
      </S.ComponentWrapper>
    );
  }
  // SUCCESS
  if (isSuccess) {
    const { pfp, username, alias, email, address } = personalInfoData;

    return (
      <S.ComponentWrapper>
        <ContentBlockWrapper height={"fit-content"}>
          <S.PersonalInfoWrapper>
            <S.MainContentWrapper>
              <S.ProfilePicture src={pfp} alt="프로필 사진" />
              {/* 닉네임, 별명 */}
              <S.NameInfoWrapper>
                <S.UserName>{username}</S.UserName>
                <S.UserAlias>{alias}</S.UserAlias>
              </S.NameInfoWrapper>
              <S.EditButton onClick={openModal}>편집</S.EditButton>
            </S.MainContentWrapper>
            <LineDivider />
            {/* 이메일 */}
            <S.UserEmail>
              <S.IconWrapper>
                <S.EmailIcon />
              </S.IconWrapper>
              {email}
            </S.UserEmail>
            <LineDivider />
            {/* 주소 */}
            <S.UserAddress>
              <S.IconWrapper>
                <S.AddressIcon />
              </S.IconWrapper>
              {address}
            </S.UserAddress>
            <LineDivider />
            <PersonalInfoForm
              existingPersonalInfo={{ pfp, username, alias, email, address }}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
            />
          </S.PersonalInfoWrapper>
        </ContentBlockWrapper>
      </S.ComponentWrapper>
    );
  }
}
