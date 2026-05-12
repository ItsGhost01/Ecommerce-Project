
import AccessDenied from "../assets/AccessDenied.png";
import { Link } from "react-router";
export default function Forbidden() {
  return (
   <div className="flex flex-col items-center justify-center bg-gray-50 text-center">
      <img
        src={AccessDenied}
        alt="404 Illustration"
        className="w-48 sm:w-64 md:w-80 lg:w-180"
      />

      {/* <p className="text-gray-500 mt-2 text-lg">
        Oops! The page you are looking for doesn’t exist.
      </p> */}

      <Link
        to="/"
        className="mt-6 bg-[#7e33e0] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};
  