import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  const hasDiscount = product.discount > 0;

  const discountedPrice = hasDiscount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  return (
    <div className="relative w-full mx-auto cursor-pointer group">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[523px] object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
          />

          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition-all duration-300">
          </div>
        </div>

        <div className="flex justify-between mt-4 text-xl font-semibold text-gray-900">
          <span>{product.name}</span>
          <span className="flex flex-col items-end">
            {hasDiscount ? (
              <>
                <span className="line-through text-gray-500 text-sm">
                  ₹{new Intl.NumberFormat("en-US").format(product.price)}
                </span>
                <span className="text-green-600">
                  ₹{new Intl.NumberFormat("en-US").format(discountedPrice)}
                </span>
              </>
            ) : (
              <span>
                ₹{new Intl.NumberFormat("en-US").format(product.price)}
              </span>
            )}
          </span>
        </div>

        <p className="mt-1 text-lg text-gray-700 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-2 mt-3 text-xs">
          {product.engrave && (
            <span className="ml-2 px-2 py-0.5 rounded bg-gray-800 text-white font-semibold text-[10px]">
              Engrave
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}