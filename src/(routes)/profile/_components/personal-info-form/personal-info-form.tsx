// COMPONENT: 개인정보 수정 폼
import * as S from "./personal-info-form.style";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useEditPersonalInfo } from "../../../../api/user";
import { IPersonalInfo } from "../../types/types";
import CustomModal from "../../../../_components/modal/custom-modal";

interface IPersonalInfoFormProps {
  existingPersonalInfo: IPersonalInfo;
  isModalOpen: boolean;
  closeModal: () => void;
}
export default function PersonalInfoForm({
  existingPersonalInfo,
  isModalOpen,
  closeModal,
}: IPersonalInfoFormProps) {
  const {
    pfp: { user_id, curr, is_default },
    username,
    alias,
    email,
    address,
  } = existingPersonalInfo;
  const methods = useForm<IPersonalInfo>({
    defaultValues: {
      username,
      alias,
      email,
      address,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = methods;

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [currentPfp, setCurrentPfp] = useState<string | null>(curr || null);
  // HANDLER: 프로필 사진 파일 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
      setCurrentPfp(URL.createObjectURL(e.target.files[0]));
    }
  };

  // PUT: 사용자 개인정보
  const {
    mutate: updatePersonalInfo,
    isSuccess,
    reset,
  } = useEditPersonalInfo(user_id);
  const onSubmit: SubmitHandler<IPersonalInfo> = (data) => {
    const newPersonalInfoData = new FormData();
    if (profilePicture) {
      newPersonalInfoData.append("pfp", profilePicture);
    }
    newPersonalInfoData.append("username", data.username);
    newPersonalInfoData.append("alias", data.alias || "");
    newPersonalInfoData.append("address", data.address || "");

    updatePersonalInfo(newPersonalInfoData);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("개인정보를 성공적으로 수정하였습니다!");
      closeModal();
      reset();
    }
  }, [isSuccess, closeModal, reset]);

  useEffect(() => {
    if (is_default) {
      setCurrentPfp(curr || null);
    }
  }, [curr, is_default]);

  return (
    <CustomModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="개인정보 수정"
    >
      <FormProvider {...methods}>
        <S.Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <S.PersonalInfoWrapper>
            <S.PfpWrapper>
              <S.PfpImgWrapper>
                {currentPfp ? (
                  <S.Pfp src={currentPfp} alt="프로필 이미지" />
                ) : (
                  <S.Pfp src="/default-profile.png" alt="기본 프로필 이미지" />
                )}
              </S.PfpImgWrapper>
              <S.HiddenUploadBtn
                onClick={() => fileInputRef.current?.click()}
              />
            </S.PfpWrapper>
            <S.FileDeleteBtn
              type="button"
              onClick={() => {
                fileInputRef.current.value = null;
                setProfilePicture(null);
                setCurrentPfp(null);
              }}
            >
              삭제
            </S.FileDeleteBtn>
            <S.FileInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <S.UserName>
              <S.Label htmlFor="">이름</S.Label>
              <S.Input
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </S.UserName>
            <S.UserAlias>
              <S.Label htmlFor="">별명</S.Label>
              <S.Input type="text" placeholder="Alias" {...register("alias")} />
            </S.UserAlias>
            <S.UserAddress>
              <S.Label htmlFor="">주소</S.Label>
              <S.Input
                type="text"
                placeholder="Address"
                {...register("address")}
              />
            </S.UserAddress>
          </S.PersonalInfoWrapper>
          <S.CompleteButton type="submit">수정 완료</S.CompleteButton>
        </S.Form>
      </FormProvider>
    </CustomModal>
  );
}
