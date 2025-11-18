export default function ProductCardShimmer() {
  return (
    <div className="w-full bg-gray-100 rounded-lg shadow-sm p-4">
      <div className="w-full h-[420px] shimmer rounded-lg"></div>

      <div className="mt-4 space-y-3">
        <div className="h-5 w-3/4 shimmer rounded"></div>
        <div className="h-5 w-1/2 shimmer rounded"></div>
        <div className="h-4 w-full shimmer rounded"></div>
      </div>
    </div>
  );
}
  