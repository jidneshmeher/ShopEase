import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { loading} = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    dispatch(resetPasswordUser({ token, password }))
      .unwrap()
      .then(() => {
        toast.success("Password reset successfully!");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err || "Failed to reset password");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-black text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
