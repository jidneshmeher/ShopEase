export default function Pagination({ currentPage, totalPages, onPageChange }) {

  console.log("currentPage ",currentPage)
  console.log("totalPages ",totalPages)

  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-wrap sm:flex-nowrap gap-2 overflow-x-auto px-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 whitespace-nowrap"
        >
          Prev
        </button>
        <div className="flex gap-2 items-center">
          {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 border rounded disabled:opacity-50 whitespace-nowrap"
        >
          Next
        </button>
      </div>
    </div>
  );
}
