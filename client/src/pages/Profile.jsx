import { ProfileCard } from "../components/ProfileCard";
import useAuth from "../features/auth/hooks/useAuth";

export default function Profile() {

  const {user} = useAuth();

  if (!user) {
    return <p className="text-center mt-20">Please login to view your profile.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-black mb-8">My Profile</h1>
        <ProfileCard user={user} />
      </div>
    </div>
  );
}