import OvalLoadingSpinner from "../../../_components/loading-spinner/oval-loading-spinner";
import { useGetRecentDriverActions } from "../../../api/action";
import useInterval from "../../../hooks/useInterval";
import getElapsedTime from "../../../_utils/time";
import * as S from "../style/LiveScoreLog.style";

// COMPONENT: 최근 운전행위에 대한 운전점수를 실시간으로 표시하는 점수 로그
export default function LiveScoreLog() {
  const {
    data: recentDriverActions,
    isLoading,
    isError,
    refetch: refetchRecentDriverActions,
  } = useGetRecentDriverActions();

  useInterval(() => {
    refetchRecentDriverActions();
  }, 10000);

  if (isLoading)
    return (
      <S.LiveScoreLogWrapper>
        <OvalLoadingSpinner />
      </S.LiveScoreLogWrapper>
    );

  if (isError)
    return (
      <S.LiveScoreLogWrapper>
        최근 점수를 불러올 수 없습니다.
      </S.LiveScoreLogWrapper>
    );

  return (
    <S.LiveScoreLogWrapper>
      {recentDriverActions?.map((recentDriverActionItem) => (
        <S.LiveScoreLogItem key={recentDriverActionItem.id}>
          <S.ContentWrapper>
            <S.Content>{recentDriverActionItem.label}</S.Content>
            <S.ElapsedTime>
              {getElapsedTime(recentDriverActionItem.recorded_at)}
            </S.ElapsedTime>
          </S.ContentWrapper>
          <S.ScoreWrapper score={recentDriverActionItem.score}>
            {recentDriverActionItem.score}
          </S.ScoreWrapper>
        </S.LiveScoreLogItem>
      ))}
    </S.LiveScoreLogWrapper>
  );
}
