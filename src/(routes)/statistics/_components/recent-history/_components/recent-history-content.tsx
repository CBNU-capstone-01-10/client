// COMPONENT: 최근 운전자 행위 기록 내용 (데이터)
import { useEffect } from "react";
import { useGetRecentDriverActions } from "../../../../../api/action";
import * as S from "../recent-history.style";
import { IDriverActionResponse } from "../../../../record/types/type";
import { getFormattedDate } from "../../../../../_utils/date";
import { formatTime } from "../../../../../_utils/time";
import { ACTION_LABEL } from "../../../../../constants/constants";
import OvalLoadingSpinner from "../../../../../_components/loading-spinner/oval-loading-spinner";
import { useInView } from "react-intersection-observer";

interface IRecentHistoryContentProps {
  onContentClick: (id: number) => void;
}
export default function RecentHistoryContent({
  onContentClick,
}: IRecentHistoryContentProps) {
  // REST API: 최근 운전자 행위 결과 다건 요청
  const {
    data: recentDriverActionsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetRecentDriverActions();
  const { ref: observerBtmRef, inView } = useInView();

  // RE-RENDER: 최하단 도달 시, 다음 페이지 페칭
  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  });

  return (
    <S.RecentHistoryContainer>
      <S.RecentHistoryWrapper>
        {/* 무한스크롤로 데이터 페칭: page[]>page>item 구조 */}
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
                    onClick={() => onContentClick(recentDriverActionItem.id)}
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
                        : ACTION_LABEL[recentDriverActionItem.label]}
                    </S.ScoreWrapper>
                  </S.HistoryItem>
                );
              }
            )
        )}

        {isFetchingNextPage && (
          <div>
            <OvalLoadingSpinner />
          </div>
        )}
      </S.RecentHistoryWrapper>
    </S.RecentHistoryContainer>
  );
}
