export default function CategoryNav({ categories = [], filters={}, onChange }) {
  return (
    <div className="w-full top-16 bg-white shadow-sm border-b">
      <div className="flex text-lg sm:text-base flex-col sm:flex-row items-center justify-center sm:space-x-10 px-16 py-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange({...filters ,category:cat})}
            className={`whitespace-nowrap font-playfair transition-colors ${
              filters.category === cat
                ? "text-black border-b-2 border-black pb-1"
                : "text-gray-900 hover:text-black"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
  