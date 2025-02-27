// COMPONENT: 운전자 행위 결과 상세 모달
import { useGetDriverAction } from "../../api/action";
import OvalLoadingSpinner from "../loading-spinner/oval-loading-spinner";
import CustomModal from "../modal/custom-modal";
import LineDivider from "../divider/line-divider";
import { ACTION_LABEL, ActionLabel } from "../../constants/constants";
import * as S from "./driver-action-detail-modal.style";

interface IDriverActionDetailModalProps {
  actionId: number;
  onClose: () => void;
}
export default function DriverActionDetailModal({
  actionId,
  onClose,
}: IDriverActionDetailModalProps) {
  const {
    data: driverActionDetail,
    isLoading,
    isError,
  } = useGetDriverAction(actionId);

  return (
    <CustomModal isOpen={actionId ? true : false} onRequestClose={onClose}>
      <S.ContentWrapper>
        {isError && <div>데이터를 불러오는 데 실패했습니다.</div>}
        {isLoading ? (
          <OvalLoadingSpinner />
        ) : (
          <>
            {/* 운전자 행위 촬영 모습 */}
            <S.ImageWrapper>
              <S.CapturedImage
                src={`${import.meta.env.VITE_API_PROTOCOL}://${
                  import.meta.env.VITE_API_HOST
                }:${import.meta.env.VITE_API_PORT}${
                  driverActionDetail?.capture
                }`}
                alt="촬영된 모습"
              />
            </S.ImageWrapper>
            <S.LabelScoreWrapper>
              {/* 운전 행위 라벨 */}
              <S.Label>
                {driverActionDetail?.label &&
                (driverActionDetail.label as ActionLabel) in ACTION_LABEL
                  ? ACTION_LABEL[driverActionDetail.label as ActionLabel]
                  : "안전운전"}
              </S.Label>
              {/* 운전 행위 점수 */}
              <S.Score score={driverActionDetail?.score}>
                {driverActionDetail?.score}
              </S.Score>
            </S.LabelScoreWrapper>
            <LineDivider verticalMargin="0.1rem" />
            <S.LineWrapper>
              {/* 기록 위치 */}
              <S.IconWrapper>
                <S.LocationIcon />
              </S.IconWrapper>
              ({driverActionDetail?.location_x},{" "}
              {driverActionDetail?.location_y})
            </S.LineWrapper>
            <LineDivider verticalMargin="0.1rem" />
            <S.LineWrapper>
              {/* 기록 일시 */}
              <S.IconWrapper>
                <S.RecordedAtIcon />
              </S.IconWrapper>
              {new Date(
                driverActionDetail?.recorded_at as string
              ).toLocaleString()}
            </S.LineWrapper>
            <LineDivider verticalMargin="0.1rem" />
            <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
          </>
        )}
      </S.ContentWrapper>
    </CustomModal>
  );
}
