import { useState, useRef, useEffect } from "react";
import { LuThumbsUp, LuThumbsDown, LuCircleUserRound } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";
import { FaStar } from "react-icons/fa";
import { deleteReview } from "../reviewService";
import useAuth from "../../auth/hooks/useAuth";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";
import Rating from "../../products/components/Rating";

export default function ReviewCard({ review, onDeleted, onEdit }) {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleDelete = async () => {
    try {
      const data = await deleteReview(review._id);
      if (data.success) {
        toast.success("Review deleted successfully");
        onDeleted(review._id);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="bg-white border shadow rounded-2xl p-4 mb-4 relative">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <LuCircleUserRound className="w-10 h-10 " />
          </div>
          <p className="text-gray-800 font-semibold">By {review.user?.name}</p>
        </div>

        {user?._id === review.user?._id && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded hover:bg-gray-200"
            >
              <HiDotsVertical className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(review);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowConfirm(true);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 flex">
        <Rating rating={review.rating}/>
      </div>

      <p className="mt-2 text-gray-700">{review.comment}</p>

      <p className="text-sm text-gray-700 mt-1">
        {new Date(review.updatedAt) > new Date(review.createdAt)
          ? `Edited ${formatDistanceToNow(new Date(review.updatedAt), { addSuffix: true })}`
          : `${formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}`}
      </p>

      <div className="flex items-center gap-4 mt-3">
          <button className="flex items-center gap-1 text-gray-900 text-base hover:text-green-600">
            <LuThumbsUp className="w-4 h-4" /> Helpful (0)
          </button>
          <button className="flex items-center gap-1 text-gray-900 text-base hover:text-red-600">
            <LuThumbsDown className="w-4 h-4 transform -scale-x-100" /> Unhelpful (0)
          </button>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
      />
    </div>
  );
}
