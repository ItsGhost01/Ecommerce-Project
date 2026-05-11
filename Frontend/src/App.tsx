import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RootLayout from "./components/layout/RootLayout";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import axios from "axios";
import { useDispatch} from "react-redux";
import { login } from "./redux/features/userSlice";
// import type { RootState } from "./redux/store";

function App() {

  //   const reduxUser = useSelector(
  //   (globalstore: RootState) => globalstore.user.value,
  // );

  const dispatch = useDispatch();
useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("mydata", res.data.userInfo)
        dispatch(login(res.data.userInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, [dispatch]);




  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout user={user} setUser={setUser} />,
      children: [
        { path: "/", Component: Home },
        { path: "/products", Component: Products},
        {
           path: "", Component: ProtectedRoute,
          children: [

             { path: "/orders", Component: Orders},

          ]
    
          },

        {
          path: "/login",
          element: <Login setUser={setUser} />, 
        },

        {path: "/signup",  Component: Signup, },
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
