import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import RootLayout from "./components/layout/RootLayout";

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout user={user} setUser={setUser} />,
      children: [
        { index: true, element: <Home /> },

        {
          path: "login",
          element: <Login setUser={setUser} />,
        },

        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;