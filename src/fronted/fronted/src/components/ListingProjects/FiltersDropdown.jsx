import React, { useState, useRef, useEffect } from 'react';

const FiltersDropdown = ({ onFilterSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({ tag: '', location: '' });
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleApplyFilters = () => {
    setIsOpen(false);
    if (onFilterSelect) {
      onFilterSelect(filters);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full lg:w-auto">
      <button
        onClick={toggleDropdown}
        className="w-full lg:w-auto bg-zinc-950 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 shadow hover:bg-zinc-800"
      >
        Filtrar por
      </button>
      {isOpen && (
        <div
          className="absolute left-0 w-full lg:w-64 z-40 mt-2 bg-zinc-950 border border-gray-700 rounded-lg shadow-lg p-4 space-y-4"
        >
          <div>
            <label htmlFor="tag" className="block text-gray-400">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={filters.tag}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-zinc-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa un tag"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-400">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-zinc-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa una ubicación"
            />
          </div>
          <button
            onClick={handleApplyFilters}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Aplicar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersDropdown;
