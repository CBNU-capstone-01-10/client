// COMPONENT: 최근 기록
import { Suspense, useState } from "react";
import ContentBlockWrapper from "../../../../_components/block/content-block-wrapper";
import OvalLoadingSpinner from "../../../../_components/loading-spinner/oval-loading-spinner";
import DriverActionDetailModal from "../../../../_components/driver-action-detail/driver-action-detail-modal";
import RecentHistoryContent from "./_components/recent-history-content";
import * as S from "./recent-history.style";

export default function RecentHistory() {
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const handleDriverActionDetailModalClick = (driverActionId: number) => {
    setSelectedActionId(driverActionId);
  };

  const closeDriverActionDetailModal = () => {
    setSelectedActionId(null);
  };

  return (
    <ContentBlockWrapper height={"20rem"} padding={"1rem"}>
      <S.Header>최근 기록</S.Header>
      <Suspense fallback={<OvalLoadingSpinner />}>
        <RecentHistoryContent
          onContentClick={handleDriverActionDetailModalClick}
        />
      </Suspense>
      {selectedActionId && (
        <DriverActionDetailModal
          actionId={selectedActionId}
          onClose={closeDriverActionDetailModal}
        />
      )}
    </ContentBlockWrapper>
  );
}
