import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";



function App() {

  const router = createBrowserRouter([
  { path: "/", Component: Home },
   { path: "/Login", Component: Login },
]);

  return (
   <>
   <Home/>
   </>
  )
};



export default App;
