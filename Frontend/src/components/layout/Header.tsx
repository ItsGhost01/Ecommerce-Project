import {
  Mail,
  Phone,
  User,
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";

import type { RootState } from "../../redux/store";
import type { AppDispatch } from "../../redux/store";

import { logout } from "../../redux/features/userSlice";
import { fetchCarts } from "../../redux/features/cartSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const reduxUser = useSelector(
    (state: RootState) => state.user.value
  );

  const reduxCart = useSelector(
    (state: RootState) => state.cart.total
  );

  // 🔥 FETCH CART ON LOAD
  useEffect(() => {
    if (reduxUser) {
      dispatch(fetchCarts());
    }
  }, [dispatch, reduxUser]);

  function handleSubmit(e: any) {
    e.preventDefault();

    const value = e.target.searchText.value;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("q", value);
      return newParams;
    });

    if (location.pathname !== "/products") {
      navigate("/products?q=" + value);
    }
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#7E33E0] text-[#F1F1F1] w-full text-[12px] font-josefin">
        <div className="container mx-auto px-3 py-3 md:py-5 flex flex-col gap-4 items-center sm:flex-row sm:justify-between">
          <div className="flex gap-8">
            <div className="flex gap-2 items-center">
              <Mail />
              <span>email@example.com</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone />
              <span>1234567890</span>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <div className="flex gap-1 items-center">
              {reduxUser ? (
                <>
                  <span>
                    {reduxUser.firstName} {reduxUser.lastName}
                  </span>
                  <span
                    className="hover:underline cursor-pointer"
                    onClick={() => dispatch(logout())}
                  >
                    logout
                  </span>
                </>
              ) : (
                <Link to="/Login">Login</Link>
              )}
              <User />
            </div>

            <div className="flex gap-1 items-center">
              <span>Wishlist</span>
              <Heart />
            </div>

            {reduxUser && (
              <button
                className="relative px-2 py-2 cursor-pointer hover:scale-95 active:scale-95 transition"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart />

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {reduxCart}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="container">
        <div className="py-3 md:py-5 flex items-center justify-between">
          <Link to="/">
            <span className="font-josefin font-bold text-3xl">Mstore</span>
          </Link>

          <div
            className={
              menuOpen
                ? "flex flex-col gap-4 p-8 fixed bg-white-50 top-0 bottom-0 right-0 z-50"
                : "hidden lg:flex lg:gap-4"
            }
          >
            <X
              onClick={() => setMenuOpen(false)}
              className="lg:hidden cursor-pointer self-end"
            />

            <Link to="/">Home</Link>
            <Link to="/Products">Products</Link>

            {reduxUser && <Link to="/Orders">Orders</Link>}

            <Link to="/Contact">Contact</Link>
            <Link to="/About">About</Link>

            {reduxUser && <Link to="/Cart">Cart</Link>}
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSubmit} className="flex">
              <input
                defaultValue={searchParams.get("q") || ""}
                type="text"
                name="searchText"
                placeholder="Search..."
                className="border border-black px-2 py-1 text-sm"
              />

              <button className="text-white bg-[#FB2E86] px-2 py-1">
                <Search />
              </button>
            </form>

            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}