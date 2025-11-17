import { useEffect, useState, lazy, Suspense } from "react";
import BottomNavBar from "../_components/bottomNavBar/bottom-navbar";
import TopNavBar from "../_components/topNavBar/top-navbar";
import { TAB } from "../constants/constants";
import { useGetPersonalInfo } from "../api/user";
import { useUserStore } from "../store/use-user-store";

import RecordPage from "./record/page";
const StatisticsPage = lazy(() => import("./statistics/page"));
const ProfilePage = lazy(() => import("./profile/page"));

// Layout: 메인 레이아웃
export default function MainLayout() {
  const [activeTab, setActiveTab] = useState(TAB.RECORD);

  const renderPage = () => {
    switch (activeTab) {
      case TAB.RECORD:
        return <RecordPage />;
      case TAB.STATISTICS:
        return (
          // TODO: 로딩 Suspense 보완 필요
          <Suspense fallback={<div>loading</div>}>
            <StatisticsPage />
          </Suspense>
        );

      case TAB.PROFILE:
        return (
          // TODO: 로딩 Suspense 보완 필요
          <Suspense fallback={<div>loading</div>}>
            <ProfilePage />
          </Suspense>
        );
      default:
        return <RecordPage />;
    }
  };

  const { data: userData } = useGetPersonalInfo();
  const { keepUserId } = useUserStore();

  useEffect(() => {
    keepUserId(userData?.pfp.user_id);
  }, [keepUserId, userData]);

  return (
    <>
      <TopNavBar title={activeTab} />
      <main>{renderPage()}</main>
      <BottomNavBar setActiveTab={setActiveTab} />
    </>
  );
}
