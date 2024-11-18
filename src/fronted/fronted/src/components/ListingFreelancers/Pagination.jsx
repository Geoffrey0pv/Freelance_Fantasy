import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="p-4 flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === i + 1 ? 'bg-white text-black' : 'bg-gray-300'
          } hover:bg-blue-400 hover:text-white`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
