
import { Link } from "react-router"
export default function Signup() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-10 shadow-sm">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold underline decoration-[#FB2E86] decoration-dotted">Signup</h1>
    

          <p className="text-sm text-gray-400 mt-2">
            Please Signup by filling detail bellow.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          {/* <label htmlFor="email" className="text-sm font-medium">Email</label> */}

           <input
            type="firstName"
            placeholder="First Name"
            required
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />
            <input
            type="LastName"
            placeholder="Last Name"
            required
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:border-[#FB2E86] transition"
          />
          
          <button
            type="submit"
            className="w-full bg-[#FB2E86] hover:bg-pink-600 text-white font-semibold py-3 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account?
          <span className="text-pink-500 cursor-pointer ml-1">
           <Link to={"/Login"}> Login</Link>
          </span>
        </p>
      </div>
    </div>
  )
}
