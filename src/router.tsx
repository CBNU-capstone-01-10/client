import { createBrowserRouter } from "react-router-dom";
import NotFoundErrorPage from "./(routes)/_errors/_components/NotFoundErrorPage";

import RecordPage from "./(routes)/record/page";

import Log from "./(routes)/log/page";

import Profile from "./(routes)/profile/page";

import EnterLayout from "./(routes)/EnterLayout";
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
        element: <EnterLayout />,
        children: [
          {
            path: "/signin",
            children: [
              // { path: "/signin", element: <SignInPage /> },
              // { path: "/signup", element: <SignUpPage /> },
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
