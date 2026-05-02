import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./components/layout/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { path: "/", Component: Home },
        { path: "/Login", Component: Login },
        { path: "/Signup", Component: Signup },
      ],
    },
    //  { path: "/Login", Component: Login },
    //   { path: "/Pages", Component: Pages },
    //      { path: "/Signup", Component: Signup },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
