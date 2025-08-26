import { Link } from "react-router-dom";
import notFoundImage from "../assets/images/not-found.svg";

export default function NotFound({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <img
        src={notFoundImage}
        alt="Page not found"
        className="w-1/3 max-w-full mb-6"
      />
      {/* <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        {message || "The page you’re looking for doesn’t exist or may have been removed."}
      </p> */}
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
