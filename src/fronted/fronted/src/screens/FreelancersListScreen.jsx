// src/screens/FreelancersListScreen.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listFreelancers } from "../redux/actions/freelancerActions";
import FreelancerCard from "../components/ListingFreelancers/FreelancerCard";
import Pagination from "../components/ListingFreelancers/Pagination";
import FiltersDropdown from "../components/ListingFreelancers/FiltersDropdown";
import SearchBar from "../components/ListingFreelancers/SearchBar";
import { useNavigate } from "react-router-dom";

const FreelancersListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const freelancersList = useSelector((state) => state.freelancersList);
  const userLogin = useSelector((state) => state.userLogin);

  const { freelancers, loading, error, page, pages } = freelancersList;
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listFreelancers());
  }, [dispatch]);

  const handleViewMore = (freelancerId) => {
    if (userInfo) {
      navigate(`/public/profile/${freelancerId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header con barra de búsqueda y filtros */}
      <div className="flex flex-wrap justify-between items-center p-4 bg-zinc-800 sticky top-0 z-10 shadow-md">
        <SearchBar className="w-full sm:w-2/3 lg:w-1/2 mb-4 sm:mb-0" />
        <FiltersDropdown className="w-full sm:w-auto" />
      </div>

      {/* Contenido principal */}
      {loading ? (
        <p className="text-center mt-8">Cargando...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-8">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {freelancers.map((freelancer) => (
            <FreelancerCard
              key={freelancer.id}
              freelancer={freelancer}
              onViewMore={() => handleViewMore(freelancer.id)}
            />
          ))}
        </div>
      )}

      {/* Paginación */}
      <Pagination
        currentPage={page || 1}
        totalPages={pages || 1}
        className="py-4"
      />
    </div>
  );
};

export default FreelancersListScreen;
