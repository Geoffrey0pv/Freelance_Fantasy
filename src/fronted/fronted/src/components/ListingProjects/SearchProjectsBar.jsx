import React, { useState } from 'react';

const SearchProjectsBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center bg-gray-200 rounded-md p-2 w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar proyectos..."
        className="flex-grow px-4 py-2 bg-transparent focus:outline-none text-gray-700"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchProjectsBar;
