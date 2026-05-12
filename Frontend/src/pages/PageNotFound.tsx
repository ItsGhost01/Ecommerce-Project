import { Link } from "react-router";
import pageNotFound from "../assets/PageNotFound.png";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 text-center">
      <img
        src={pageNotFound}
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
}
