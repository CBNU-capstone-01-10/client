import { useGetDriverAction } from "../../api/action";
import OvalLoadingSpinner from "../loading-spinner/oval-loading-spinner";
import CustomModal from "../modal/custom-modal";
import * as S from "./driver-action-detail-modal.style";
import LineDivider from "../divider/line-divider";

// COMPONENT: 운전자 행위 결과 상세 모달
export default function DriverActionDetailModal({ actionId, onClose }) {
  const { data: driverActionDetail, isLoading } = useGetDriverAction(actionId);

  if (isLoading) {
    return <OvalLoadingSpinner />;
  }

  if (!driverActionDetail) {
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <CustomModal isOpen={actionId} onRequestClose={onClose}>
      <S.ContentWrapper>
        {/* 기록 장면 */}
        <S.ImageWrapper>
          <S.CapturedImage src={driverActionDetail.capture} alt="촬영된 모습" />
        </S.ImageWrapper>
        <S.LabelScoreWrapper>
          <S.Label>{driverActionDetail.label}</S.Label>
          <S.Score score={driverActionDetail.score}>
            {driverActionDetail.score}
          </S.Score>
        </S.LabelScoreWrapper>
        <LineDivider verticalMargin="0.1rem" />
        {/* 기록 위치 */}
        <S.LineWrapper>
          <S.IconWrapper>
            <S.LocationIcon />
          </S.IconWrapper>
          ({driverActionDetail.location_x}, {driverActionDetail.location_y})
        </S.LineWrapper>
        <LineDivider verticalMargin="0.1rem" />
        {/* 기록 시각 */}
        <S.LineWrapper>
          <S.IconWrapper>
            <S.RecordedAtIcon />
          </S.IconWrapper>
          {new Date(driverActionDetail.recorded_at).toLocaleString()}
        </S.LineWrapper>
        <LineDivider verticalMargin="0.1rem" />
        <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
      </S.ContentWrapper>
    </CustomModal>
  );
}
