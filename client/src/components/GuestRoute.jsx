import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

export default function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/" replace /> : <Outlet />;
}
