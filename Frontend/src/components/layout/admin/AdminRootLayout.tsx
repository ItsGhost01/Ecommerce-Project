
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
   <div className="flex h-screen bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#111] flex flex-col justify-between">

        {/* Top */}
        <div>
          <div className="p-5 border-b border-gray-800">
            <h2 className="font-bold text-lg">ADMIN</h2>
          </div>

          <div className="flex flex-col gap-2 p-4">

            <Link
              to="/admin/dashboard"
              className="px-4 py-2 rounded hover:bg-gray-800"
            >
              Dashboard
            </Link>

            <Link
              to="products"
              className="px-4 py-2 rounded hover:bg-gray-800"
            >
              Products
            </Link>

            <Link
              to="/categories/add"
              className="px-4 py-2 rounded bg-yellow-500 text-black"
            >
              Categories
            </Link>

          </div>
        </div>

        {/* Bottom user */}
        <div className="p-4 border-t border-gray-800 text-sm">
          <p>{reduxUser?.firstName} {reduxUser?.lastName}</p>
          <button
            onClick={() => dispatch(logout())}
            className="mt-2 text-red-400"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="h-16 bg-[#1a1a1a] flex items-center justify-between px-6 border-b border-gray-800">
          <h1 className="font-semibold">Categories</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm">{reduxUser?.firstName}</span>
            <button
              onClick={() => dispatch(logout())}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}