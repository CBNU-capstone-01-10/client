import { createBrowserRouter } from "react-router-dom";
import NotFoundErrorPage from "./(routes)/_errors/_components/NotFoundErrorPage";

import Home from "./(routes)/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: (
      <>
        <NotFoundErrorPage />
      </>
    ),
    // loader: async () => {},
  },
]);

export default router;
