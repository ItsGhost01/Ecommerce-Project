import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/signup", {
        firstName: e.target.first_name.value,
        lastName: e.target.last_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        toast.success("Account Created Succesfully!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);

        toast.error(
          err.response?.data?.msg ||
          "Signup failed"
        );
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">

      <div className="w-full max-w-md bg-white p-10">

        <h1 className="text-3xl font-bold mb-6">Signup</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="w-full border p-3"
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="w-full border p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3"
            required
          />

          <button className="w-full bg-pink-500 text-white p-3">
            Sign Up
          </button>

        </form>

        <p className="mt-4 text-sm">
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}