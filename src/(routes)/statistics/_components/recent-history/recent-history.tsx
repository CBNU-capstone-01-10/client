import { useState } from "react";
import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import OvalLoadingSpinner from "../../../../_components/loading-spinner/oval-loading-spinner";
import { getFormattedDate } from "../../../../_utils/date";
import { useGetRecentDriverActions } from "../../../../api/action";
import * as S from "./recent-history.style";
import DriverActionDetailModal from "../../../../_components/driver-action-detail/driver-action-detail-modal";

// COMPONENT: 최근 안전점수 기록
export default function RecentHistory() {
  const {
    data: recentDriverActions,
    isLoading,
    isError,
    isSuccess,
  } = useGetRecentDriverActions();

  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const handleDriverActionDetailModalClick = (driverActionId: number) => {
    setSelectedActionId(driverActionId);
  };

  const closeDriverActionDetailModal = () => {
    setSelectedActionId(null);
  };

  // 로딩 중일 때 스피너 표시
  if (isLoading)
    return (
      <S.RecentHistoryWrapper>
        <OvalLoadingSpinner />
      </S.RecentHistoryWrapper>
    );

  // 에러 발생 시 에러 메시지 표시
  if (isError)
    return (
      <S.RecentHistoryWrapper>
        최근 점수를 불러올 수 없습니다.
      </S.RecentHistoryWrapper>
    );

  if (isSuccess) {
    return (
      <ContentBlockWrapper height={"16rem"}>
        <S.Header>최근점수</S.Header>
        <S.RecentHistoryContainer>
          <S.RecentHistoryWrapper>
            {recentDriverActions?.map((recentDriverActionItem) => {
              const recordedAt = getFormattedDate(
                recentDriverActionItem.recorded_at
              );
              return (
                <S.HistoryItem
                  key={recentDriverActionItem.id}
                  onClick={() =>
                    handleDriverActionDetailModalClick(
                      recentDriverActionItem.id
                    )
                  }
                >
                  <S.HistoryIcon score={recentDriverActionItem.score} />
                  <S.RecordedAt>{recordedAt}</S.RecordedAt>
                  <S.ScoreWrapper score={recentDriverActionItem.score}>
                    {recentDriverActionItem.score}
                  </S.ScoreWrapper>
                </S.HistoryItem>
              );
            })}
          </S.RecentHistoryWrapper>
        </S.RecentHistoryContainer>
        {selectedActionId && (
          <DriverActionDetailModal
            actionId={selectedActionId}
            onClose={closeDriverActionDetailModal}
          />
        )}
      </ContentBlockWrapper>
    );
  }
}
