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
        logger.error("Forgot password error:", err);
      })
      .finally(() => {
        setSubmitted(true);
        toast.success("If an account exists, a reset link has been sent to your email.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      {!submitted ? (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Enter your email address below and we'll send you a password reset link.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : <><HiMail className="text-xl" /> Send Reset Link</>}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-6">
          <HiMail className="mx-auto text-6xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Check your email</h2>
          <p className="text-gray-700">
            If an account exists for{" "}
            <span className="font-medium text-blue-600">{email}</span>, you will receive a password reset link shortly.
          </p>
        </div>
      )}

      <button
        onClick={() => navigate("/login")}
        className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-medium flex items-center justify-center gap-2"
      >
        Back to Login
      </button>
    </div>
  );
}
