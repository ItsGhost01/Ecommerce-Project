import { createBrowserRouter, RouterProvider } from "react-router";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RootLayout from "./components/layout/RootLayout";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/products/Products";
import Orders from "./pages/Orders";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/features/userSlice";
import Create from "./pages/products/Create";
import Forbidden from "./pages/Forbidden";
import About from "./pages/About";
import AdminRootLayout from "./components/layout/admin/AdminRootLayout";
import Dashboard from "./pages/admin/Dashboard";
import type { RootState } from "@reduxjs/toolkit/query";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Categories from "./pages/admin/Categories";
import Product from "./pages/admin/Product";
import Users from "./pages/admin/Users";
// import { setCartCount } from "./redux/features/cartSlice";

function App() {

  const reduxUser = useSelector(
    (globalstore: RootState) => globalstore.user.value,
  );

  
  const [isLoading, setIsLoading] = useState(true);

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
          console.log("mydata", res.data.userInfo);

          dispatch(login(res.data.userInfo));

          // setIsLoading(false); // missing
        })
        .catch((err) => {
          
          console.log(err);
          setIsLoading(false);
        });
      
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (reduxUser) {
      setIsLoading(false);
    }
  }, [reduxUser]);



  const router = createBrowserRouter([
    {
      path: "admin",
      element: <ProtectedRoute forAdmin={true} />,
      children: [
        {
          path: "",
          Component: AdminRootLayout,
          children: [
            { path: "categories", Component: Categories },
            { path: "dashboard", Component: Dashboard },
            { path: "products", Component: Product},
            { path: "users", Component: Users},
            
          ],
        },
      ],
    },
    {
      path: "/",
      Component: RootLayout,
      children: [
        { path: "/", Component: Home },
        { path: "/products", Component: Products },
        { path: "/Contact", Component: Contact },
         { path: "/About", Component: About },
      

        {
          path: "",
          Component: ProtectedRoute,
          children: [{ path: "/orders", Component: Orders },
                { path: "/Cart", Component: Cart},
          ],
          
        },

        {
          path: "",
          element: <ProtectedRoute forSeller={true} />,
          children: [{ path: "seller/product/add", Component: Create }],
        },
        { path: "*", Component: Forbidden },

        {
          path: "/login",
          element: <Login />,
        },
         { path: "/signup", Component: Signup },
      ],
    },
  ]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          is loading.......
        </div>
      ) : (
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
      )}
    </>
  );
}

export default App;
