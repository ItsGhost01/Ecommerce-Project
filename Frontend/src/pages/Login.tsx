
import { Link } from "react-router"
export default function Login() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 shadow-lg">
      <div className="w-full max-w-md bg-white p-10 shadow-sm">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold underline decoration-[#FB2E86] decoration-dotted">Login</h1>
    

          <p className="text-sm text-gray-400 mt-2">
            Please login using account detail bellow.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          {/* <label htmlFor="email" className="text-sm font-medium">Email</label> */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />

          {/* Forgot Password */}
          <div>
            <button
              type="button"
              className="text-sm text-gray-400 hover:text-[#FB2E86] transition"
            >
              Forgot your password?
            </button>
          </div>

      
          <button
            type="submit"
            className="w-full bg-[#FB2E86] hover:bg-pink-600 text-white font-semibold py-3 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an Account?
          <span className="text-pink-500 cursor-pointer ml-1">
           <Link to={"/Signup"}> Create account</Link>
          </span>
        </p>
      </div>
    </div>
  )
}
