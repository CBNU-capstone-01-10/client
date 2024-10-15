import { createBrowserRouter } from "react-router-dom";
import NotFoundErrorPage from "./(routes)/_errors/_components/NotFoundErrorPage";
import SignupPage from "./(routes)/(account)/signup/signup-page";
import SigninPage from "./(routes)/(account)/signin/page";
import MainLayout from "./(routes)/MainLayout";
import SignupLayout from "./(routes)/signup-layout";
import SplashLayout from "./(routes)/SplashLayout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundErrorPage />,
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
        path: "/home",
        element: <MainLayout />,
      },
    ],
  },
]);

export default router;
