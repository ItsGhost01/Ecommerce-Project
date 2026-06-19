import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/userSlice";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    axios
      .post("http://localhost:5000/api/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        toast("login success!");
        console.log(res.data);
        // setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.user));
        navigate(res.data.user.isAdmin ? "/admin/dashboard" : "/");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error("Invalid Credentails");
        } else if (err.response?.status === 400) {
          toast.error(err.response.data.msg);
        } else {
          toast.error("something went wrong");
        }
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 shadow-lg">
      <div className="w-full max-w-md bg-white p-10 shadow-sm">
        {/* Heading */}
        <div className="text-center mb-8  font-Lat ">
          <h1 className="text-4xl font-bold underline decoration-[#FB2E86] decoration-dotted">
            Login
          </h1>

          <p className="text-sm text-gray-400 mt-2 font-Lato">
            Please login using account detail below.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            defaultValue={"Shrestha.sumit1111@gmail.com"}
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              defaultValue={"123456"}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-3 pr-12 outline-none text-sm focus:border-[#FB2E86] transition"
            />
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FB2E86] w-5 h-5 cursor-pointer"
              />
            ) : (
              <EyeClosed
                onClick={() => setShowPassword(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
              />
            )}
          </div>

          {/* Forgot Password */}
          <div>
            <button
              type="button"
              className="text-sm text-gray-400 hover:text-[#FB2E86] transition font-Lato "
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FB2E86] hover:bg-pink-600 text-white font-semibold py-3 transition font-Lato,sans-serif "
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an Account?
          <span className=" ml-1 font-Lato,sans-serif not-italic text-[17px] text-[#FB2E86] leading-normal cursor-pointer hover:underline decoration-[##FB2E86]">
            <Link to={"/Signup"}> Create account</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
