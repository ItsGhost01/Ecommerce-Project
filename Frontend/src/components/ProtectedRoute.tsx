import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Outlet } from "react-router";
import type { RootState } from "../redux/store";

export default function ProtectedRoute({
  forSeller = false,
  forAdmin = false,
}) {
  const reduxUser = useSelector(
    (globalStore: RootState) => globalStore.user.value,
  );

  if (reduxUser) {
    if (forSeller) {
      if (reduxUser.isSeller) {
        return <Outlet />;
      } else {
        return <Navigate to="/forbidden" />;
      }
    } else if (forAdmin) {
      if (reduxUser.isAdmin) {
        return <Outlet />;
      } else {
        return <Navigate to="/forbidden" />;
      }
    }

    return <Outlet />;
  }

  return <Navigate to="/login" />;
}