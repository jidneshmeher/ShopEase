import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPasswordUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import useAuth from "../features/auth/hooks/useAuth";
import { HiMail } from "react-icons/hi";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordUser(email))
      .unwrap()
      .catch((err) => {
        console.error("Forgot password error:", err);
      })
      .finally(() => {
        setSubmitted(true);
        toast.success("Reset link sent to your email");
      });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 sm:mt-20 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      {!submitted ? (
        <>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-center mb-3 sm:mb-4 text-sm sm:text-base">
            Enter your email address below and we'll send you a password reset link.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-lg flex items-center justify-center gap-2 font-medium disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : <><HiMail className="text-lg sm:text-xl" /> Send Reset Link</>}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-6 px-2 sm:px-0">
          <HiMail className="mx-auto text-5xl sm:text-6xl text-blue-500 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">Check your email</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            If an account exists for{" "}
            <span className="font-medium text-blue-600">{email}</span>, you will receive a password reset link shortly.
          </p>
        </div>
      )}

      <button
        onClick={() => navigate("/login")}
        disabled={loading}
        className={`mt-4 sm:mt-6 w-full p-2 sm:p-3 rounded-lg font-medium flex items-center justify-center gap-2 
          ${loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
      >
        Back to Login
      </button>
    </div>
  );
}
