import React, { useState, useEffect, useRef } from 'react';

const FiltersDropdown = ({ onFilterSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Ordenar por');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
    if (onFilterSelect) {
      onFilterSelect(filter);
    }
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
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-black shadow hover:bg-gray-100"
      >
        {selectedFilter}
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
          <li
            onClick={() => handleSelect('Mayor Rating')}
            className="px-4 py-2 cursor-pointer hover:bg-gray-500 text-black-100"
          >
            Mayor Rating
          </li>
          <li
            onClick={() => handleSelect('Mayor Proyectos')}
            className="px-4 py-2 cursor-pointer hover:bg-gray-500 text-black-100"
          >
            Mayor Proyectos
          </li>
        </ul>
      )}
    </div>
  );
};

export default FiltersDropdown;
