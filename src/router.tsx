import { createBrowserRouter } from "react-router-dom";
import NotFoundErrorPage from "./(routes)/_errors/_components/NotFoundErrorPage";

import RecordPage from "./(routes)/record/page";

import StatisticsPage from "./(routes)/statistics/page";

import Profile from "./(routes)/profile/page";

// import SignupPage from "./(routes)/(account)/signup/page";
import SignupPage from "./(routes)/(account)/signup/signup-page";
import SigninPage from "./(routes)/(account)/signin/page";

import SplashLayout from "./(routes)/SplashLayout";
import MainLayout from "./(routes)/MainLayout";
import SignupLayout from "./(routes)/signup-layout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <>
        <NotFoundErrorPage />
      </>
    ),
    // loader: async () => {},
    children: [
      {
        children: [{ index: true, element: <SigninPage /> }],
      },
      {
        element: <SignupLayout />,
        children: [{ path: "/signup", element: <SignupPage /> }],
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            path: "record",
            element: <RecordPage />,
          },
          {
            path: "statistics",
            element: <StatisticsPage />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
