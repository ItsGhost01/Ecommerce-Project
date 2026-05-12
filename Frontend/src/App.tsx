import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect} from "react";
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
import { useDispatch} from "react-redux";
import { login } from "./redux/features/userSlice";
import PageNotFound from "./pages/PageNotFound";
import Create from "./pages/products/Create";
import Forbidden from "./pages/Forbidden";
import About from "./pages/About";



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






  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { path: "/", Component: Home },
        { path: "/products", Component: Products},
        {
           path: "", Component: ProtectedRoute,
          children: [ { path: "/orders", Component: Orders},

          ]
    
          },

          {
           path: "",  element: <ProtectedRoute isSeller={true}/>,
          children: [
             { path: "seller/product/add", Component: Create},
          ]
    
          },
           {path: "*",  Component: Forbidden },

        {
          path: "/login",
          element: <Login/>, 
        },

        {path: "/signup",  Component: Signup },
        {path: "/About",  Component: About },
      
      
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
