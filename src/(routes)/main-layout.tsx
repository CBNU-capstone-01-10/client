import BottomNavBar from "../_components/bottomNavBar/bottom-navbar";
import TopNavBar from "../_components/topNavBar/top-navbar";
import RecordPage from "./record/page";
import StatisticsPage from "./statistics/page";
import ProfilePage from "./profile/page";
import { useState } from "react";
import { TAB } from "../constants/constants";

// Layout: 메인 레이아웃
export default function MainLayout() {
  const [activeTab, setActiveTab] = useState(TAB.RECORD);

  const renderPage = () => {
    switch (activeTab) {
      case TAB.RECORD:
        return <RecordPage />;
      case TAB.STATISTICS:
        return <StatisticsPage />;
      case TAB.PROFILE:
        return <ProfilePage />;
      default:
        return <RecordPage />;
    }
  };

  return (
    <>
      <TopNavBar title={activeTab} />
      <main>{renderPage()}</main>
      <BottomNavBar setActiveTab={setActiveTab} />
    </>
  );
}
