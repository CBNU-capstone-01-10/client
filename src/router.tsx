import { createBrowserRouter } from "react-router-dom";
import NotFoundErrorPage from "./(routes)/_errors/_components/NotFoundErrorPage";

import RecordPage from "./(routes)/record/page";

import Log from "./(routes)/log/page";

import Profile from "./(routes)/profile/page";

import SignupPage from "./(routes)/(account)/signup/page";
import SigninPage from "./(routes)/(account)/signin/page";

import SplashLayout from "./(routes)/SplashLayout";
import MainLayout from "./(routes)/MainLayout";

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
        element: <SplashLayout />,
        children: [
          {
            path: "/",
            children: [
              { path: "/signin", element: <SigninPage /> },
              { path: "/signup", element: <SignupPage /> },
            ],
          },
        ],
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
            path: "log",
            element: <Log />,
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
