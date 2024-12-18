// COMPONENT: 최근 기록
import { useEffect, useState } from "react";
import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import OvalLoadingSpinner from "../../../../_components/loading-spinner/oval-loading-spinner";
import { getFormattedDate } from "../../../../_utils/date";
import { useGetRecentDriverActions } from "../../../../api/action";
import DriverActionDetailModal from "../../../../_components/driver-action-detail/driver-action-detail-modal";
import { useInView } from "react-intersection-observer";
import { IDriverActionResponse } from "../../../record/types/type";
import LoadingErrorIcon from "../../../../_components/icon/loading-error-icon";
import { formatTime } from "../../../../_utils/time";
import { ACTION_LABEL, ActionLabel } from "../../../../constants/constants";
import * as S from "./recent-history.style";

export default function RecentHistory() {
  const {
    data: recentDriverActionsPages,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetRecentDriverActions();
  const { ref: observerBtmRef, inView } = useInView();

  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const handleDriverActionDetailModalClick = (driverActionId: number) => {
    setSelectedActionId(driverActionId);
  };

  const closeDriverActionDetailModal = () => {
    setSelectedActionId(null);
  };

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  });

  // 에러 발생 시 에러 메시지 표시
  if (isError)
    return (
      <ContentBlockWrapper height={"16rem"}>
        <LoadingErrorIcon color="red" size="2.4rem" />
      </ContentBlockWrapper>
    );

  return (
    <ContentBlockWrapper height={"20rem"} padding={"1rem"}>
      <S.Header>최근 기록</S.Header>
      <S.RecentHistoryContainer>
        <S.RecentHistoryWrapper>
          {/* 무한스크롤로 데이터 페칭: page[]>page>item 구조 */}
          {isLoading ? (
            <OvalLoadingSpinner />
          ) : (
            <>
              {recentDriverActionsPages?.pages.map(
                (recentDriverActionsPage: IDriverActionResponse["action"][]) =>
                  recentDriverActionsPage?.map(
                    (
                      recentDriverActionItem: IDriverActionResponse["action"],
                      idx: number
                    ) => {
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
                          ref={
                            recentDriverActionsPage.length === idx + 1
                              ? observerBtmRef
                              : null
                          }
                        >
                          <S.HistoryIcon score={recentDriverActionItem.score} />
                          <S.RecordedAt>{recordedAt}</S.RecordedAt>
                          <S.ScoreWrapper score={recentDriverActionItem.score}>
                            {recentDriverActionItem.score >= 0
                              ? formatTime(recentDriverActionItem.score)
                              : ACTION_LABEL[
                                  recentDriverActionItem.label as ActionLabel
                                ]}
                          </S.ScoreWrapper>
                        </S.HistoryItem>
                      );
                    }
                  )
              )}
            </>
          )}
          {isFetchingNextPage && (
            <div>
              <OvalLoadingSpinner />
            </div>
          )}
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
