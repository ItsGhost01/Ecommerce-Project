import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router";
import { Outlet } from "react-router";
import type { RootState } from "../redux/store";

export default function ProtectedRoute({ isSeller = false }) {
  const reduxUser = useSelector(
    (globalStore: RootState) => globalStore.user.value,
  );

  if (reduxUser) {
    if (isSeller) {
      if (reduxUser.isSeller) {
        return <Outlet />;
      } else {
        return <Navigate to="/forbidden" />;
        return <Link to="/forbidden">forbidden</Link>;
      }
    }

    return <Outlet />;
  }

  return <Navigate to="/login" />;
}