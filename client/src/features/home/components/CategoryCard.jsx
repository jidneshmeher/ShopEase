import { Link } from "react-router-dom";

const CategoryCard = ({ image, title, subTitle, link }) => {
  return (
    <div className="relative text-center group w-full max-w-[570px] mx-auto px-4 sm:px-0">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-md object-cover w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[520px] transition duration-500 group-hover:brightness-75"
        />

        {link && (
          <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Link
              to={link}
              className="px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white font-semibold rounded-full text-base sm:text-lg shadow-lg hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>

      <h2 className="mt-4 font-semibold text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-2 text-base sm:text-lg max-w-md mx-auto">{subTitle}</p>
    </div>
  );
};

export default CategoryCard;
