import * as S from "./personal-info-form.style";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useEditPersonalInfo } from "../../../../api/user";
import { IPersonalInfo } from "../../types/types";
import Modal from "react-modal";

const customModalStyles = {
  content: {
    borderRadius: "1rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    HeaderTitle: "80%",
  },
};

// COMPONENT: 사용자 개인정보 수정 폼
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
  const { pfp, username, alias, email, address } = existingPersonalInfo;
  const methods = useForm<IPersonalInfo>({
    defaultValues: {
      pfp,
      username,
      alias,
      email,
      address,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = methods;

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [currentPfp, setCurrentPfp] = useState<string | null>(pfp || null); // 현재 프로필 사진 경로 상태 추가

  // 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
      setCurrentPfp(URL.createObjectURL(e.target.files[0])); // 파일이 업로드되면 해당 파일의 URL을 currentPfp로 설정
    }
  };

  // PUT: 사용자 개인정보
  const { mutate: updatePersonalInfo, isSuccess } = useEditPersonalInfo();

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

  // 개인정보 수정이 성공하면 페이지를 새로고침
  useEffect(() => {
    if (isSuccess) {
      alert("개인정보를 성공적으로 수정하였습니다!");
      location.reload();
    }
  }, [isSuccess]);

  // 기존 프로필 사진 초기화
  useEffect(() => {
    setCurrentPfp(pfp || null);
  }, [pfp]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel="개인정보 수정"
      appElement={document.getElementById("root")}
    >
      <FormProvider {...methods}>
        <S.Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <S.PersonalInfoWrapper>
            <S.PfpWrapper>
              <S.PfpImgWrapper>
                {currentPfp ? (
                  <S.Pfp src={currentPfp} alt="프로필 이미지" />
                ) : (
                  // @@@기본 프로필 이미지 사진 제작 필요
                  <S.Pfp src="/" alt="기본 프로필 이미지" />
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
              <S.Label htmlFor="username">이름</S.Label>
              <S.Input
                id="username"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </S.UserName>
            <S.UserAlias>
              <S.Label htmlFor="alias">별명</S.Label>
              <S.Input
                id="alias"
                type="text"
                placeholder="Alias"
                {...register("alias")}
              />
            </S.UserAlias>
            <S.UserAddress>
              <S.Label htmlFor="address">주소</S.Label>
              <S.Input
                id="address"
                type="text"
                placeholder="Address"
                {...register("address")}
              />
            </S.UserAddress>
          </S.PersonalInfoWrapper>
          <S.CompleteButton type="submit">완료</S.CompleteButton>
        </S.Form>
      </FormProvider>
    </Modal>
  );
}
