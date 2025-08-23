import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err || "Invalid credentials");
        setPassword(""); 
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700 p-6 sm:p-8">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@company.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* Forgot Password Link */}
          <Link to="/forgot-password" className="text-sm  text-[#2563eb] hover:underline dark:text-[#3b82f6]">
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={false}
            className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]"
          >
            Sign in
          </button>

          <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <a
              href="/register"
              className="font-medium text-[#2563eb] hover:underline dark:text-[#3b82f6]"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
