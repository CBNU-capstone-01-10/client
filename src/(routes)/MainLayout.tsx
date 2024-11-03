import BottomNavBar from "../_components/bottomNavBar/bottom-navbar";
import TopNavBar from "../_components/topNavBar/TopNavBar";
import RecordPage from "../(routes)/record/page";
import StatisticsPage from "../(routes)/statistics/page";
import ProfilePage from "../(routes)/profile/page";
import { useState } from "react";

// Layout: 메인 레이아웃
export default function MainLayout() {
  const [activeTab, setActiveTab] = useState("record");

  const renderPage = () => {
    switch (activeTab) {
      case "record":
        return <RecordPage />;
      case "statistics":
        return <StatisticsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <RecordPage />;
    }
  };

  return (
    <>
      <TopNavBar />
      <main>{renderPage()}</main>
      <BottomNavBar setActiveTab={setActiveTab} />
    </>
  );
}
