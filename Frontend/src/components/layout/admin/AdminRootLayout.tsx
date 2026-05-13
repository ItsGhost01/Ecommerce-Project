
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router";
import type { RootState } from "../../../redux/store";
import { logout } from "../../../redux/features/userSlice";

export default function AdminRootLayout() {
  const reduxUser = useSelector(
    (globalStore: RootState) => globalStore.user.value,
  );
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/products">products</Link>
        <Link to="/admin/categories">Category</Link>
        <span>
          {reduxUser?.firstName} {reduxUser?.lastName}
        </span>
        <span
          onClick={() => {
            dispatch(logout());
          }}
        >
          logout
        </span>
      </div>
      <Outlet />
    </div>
  );
}