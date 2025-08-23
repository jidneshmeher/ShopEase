export default function CategoryNav({ categories = [], filters={}, onChange }) {
  return (
    <div className="w-full sticky top-16 z-10 bg-white shadow-sm border-b">
      <div className="flex items-center justify-center space-x-10 px-16 py-3 overflow-x-auto scrollbar-hide">
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
  