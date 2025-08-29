import { Link } from "react-router-dom";
import notFoundImage from "../assets/images/not-found.svg";

export default function NotFound({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 sm:p-6">
      <img
        src={notFoundImage}
        alt="Page not found"
        className="w-2/3 sm:w-1/3 max-w-full mb-6"
      />
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        {message || "The page you’re looking for doesn’t exist or may have been removed."}
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Go Home
      </Link>
    </div>
  );
}
