
import axios from 'axios';
import { toast } from "react-toastify";
import { Link,  useNavigate } from "react-router"
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/userSlice';



export default function Login() {
const navigate = useNavigate();
const dispatch = useDispatch();

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
        dispatch(login(res.data.user))
         navigate("/");
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
          <h1 className="text-4xl font-bold underline decoration-[#FB2E86] decoration-dotted">Login</h1>
    

          <p className="text-sm text-gray-400 mt-2 font-Lato">
            Please login using account detail bellow.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5"
           onSubmit={handleSubmit}
           >
        
          <input
            type="email"
             name="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />

          {/* Password */}
          <input
            type="password"
             name="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />

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
  )
}
