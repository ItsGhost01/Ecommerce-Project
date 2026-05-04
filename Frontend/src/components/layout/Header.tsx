import { Mail, Phone, User, ShoppingCart, Heart, Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";




export default function Header() {

  const location = useLocation();
  console.log(location);

  const reduxUser = useSelector((globalstore:RootState) => globalstore.user.value);
  const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch()

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#7E33E0] text-[#F1F1F1] w-full text-[12px] font-josefin">
        <div className="container mx-auto px-3 py-3 md:py-5 flex flex-col gap-4 items-center sm:flex-row sm:justify-between">
          <div className="flex gap-8">
            <div className="flex gap-2 items-center">
              <Mail/>
              <span>Shrestha.sumit1371@gmail.com</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone/>
              <span>(122345)67890</span>
            </div>
          </div>
        

          <div className="flex gap-6 items-center">
            <div className="flex gap-1 items-center">
              {reduxUser ? (
                <>
                <span>{reduxUser.firstName} {reduxUser.lastName}</span>
                <span 
                onClick={() => {
                dispatch(logout())
                }}
              >
              logout
              </span>
                </>
              ) : (

              <Link to="/Login">Login</Link>
              )}
              <User/>
            </div>
            <div className="flex gap-1 items-center">
              <span>Wishlist</span>
              <Heart />
            </div>
            <ShoppingCart/>
          </div>
        </div>
      </div>

      <nav className="container">
        <div className="py-3 md:py-5 flex items-center justify-between">
          <span className="font-josefin font-bold text-3xl">Hekto</span>

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
            <Link className="hover:text-[#FB2E86]" to="/">Home</Link>
            <Link className="hover:text-[#FB2E86]" to="/Pages">Pages</Link>
            <Link className="hover:text-[#FB2E86]" to="">Products</Link>
            <Link className="hover:text-[#FB2E86]" to="">Blog</Link>
            <Link className="hover:text-[#FB2E86]" to="">Shop</Link>
            <Link className="hover:text-[#FB2E86]" to="">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex">
              <input
                type="text"
                placeholder="Search..."
                className="border border-black px-2 py-1 text-sm"
              />
              <button className="text-white bg-[#FB2E86] px-2 py-1">
                <Search />
              </button>
            </div>

            <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}