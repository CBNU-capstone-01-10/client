import { createBrowserRouter } from "react-router-dom";
import NotFoundErrorPage from "./(routes)/_errors/_components/NotFoundErrorPage";

import RecordPage from "./(routes)/record/page";

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
        element: <MainLayout />,
        children: [
          {
            path: "/record",
            element: <RecordPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
