import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, ShoppingBag } from "lucide-react";
import { FiShoppingCart } from "react-icons/fi";
import { CircleUserRound } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { logoutUser, updateUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { formatPhoneNumber} from '../utils/phone';

export function ProfileCard({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialAddress = user.address?.[0] || {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: { ...initialAddress },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);

    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        toast.error(err || "Failed to update profile");
      });
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: { ...initialAddress },
    });
    setIsEditing(false);
  };

  const handleActionClick = (action) => {
    if (action === "orders") navigate("/orders");
    if (action === "cart") navigate("/cart");
    if (action === "logout") {
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="w-24 h-24 flex items-center justify-center rounded-full">
        <CircleUserRound size={96} />
      </div>

      <div className="flex-1 w-full">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={(value) => setFormData((prev) => ({ ...prev, phone: "+" + value }))}
                inputClass="!w-full !border !rounded-lg !px-4 !py-2 !bg-gray-50 !text-gray-900"
                buttonClass="!border !bg-gray-50"
                enableSearch={true}
                countryCodeEditable={false}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Street"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                placeholder="ZIP Code"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="country"
                value={formData.address.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4 mt-2">
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium shadow hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.phone && (
              <p className="text-gray-700 mt-1">
                {formatPhoneNumber(user.phone)}
              </p>
            )}
            {user.address?.[0] && (
              <p className="text-gray-700 mt-1">
                {user.address[0].street}, {user.address[0].city}, {user.address[0].state}, {user.address[0].zipCode}, {user.address[0].country}
              </p>
            )}

            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 px-5 py-2 bg-gray-900 text-white font-medium rounded-xl shadow hover:bg-black transition"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ActionCard
            icon={<ShoppingBag size={22} />}
            label="Orders"
            onClick={() => handleActionClick("orders")}
          />
          <ActionCard
            icon={<FiShoppingCart size={22} />}
            label="Cart"
            onClick={() => handleActionClick("cart")}
          />
          <ActionCard
            icon={<LogOut size={22} />}
            label="Logout"
            danger
            onClick={() => handleActionClick("logout")}
          />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, label, danger, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition hover:shadow-md ${
        danger
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  );
}
