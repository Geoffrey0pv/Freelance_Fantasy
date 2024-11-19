import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInfoService } from '@/service/userService';
import {getProjectsByOwner } from '@/service/payingService';
import OffersCard from '@/components/Offers/OffersCards'; 
import { useNavigate } from 'react-router-dom';
import ProjectService from '@/service/projectService';

const ApplicationsScreen = () => {
  const { userLogin: { userInfo: userToken } } = useSelector((state) => state);
  const [userInfo, setUserInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const handleAcceptOffer = async (offer, project) => {
    try {
      offer.status = true;  
      offer.is_reviewed = true;
      console.log(project.id, offer.id, offer)
      const response = await ProjectService.updateOffer(project.id, offer.id, offer);
  
      const updatedProjects = projects.map(p => 
        p.id === project.id
          ? {
              ...p,
              offers: p.offers.map(o => 
                o.id === offer.id ? { ...o, status: true, is_reviewed: true } : o
              ),
            }
          : p
      );
      setProjects(updatedProjects); 
    } catch (error) {
      console.error('Error al aceptar la oferta:', error);
    }
  };
  
  const handleRejectOffer = async (offer, project) => {
    try {
      offer.status = false;  
      offer.is_reviewed = true;
      const response = await ProjectService.updateOffer(project.id, offer.id, offer);  
  
      const updatedProjects = projects.map(p => 
        p.id === project.id
          ? {
              ...p,
              offers: p.offers.map(o => 
                o.id === offer.id ? { ...o, status: false, is_reviewed: true } : o
              ),
            }
          : p
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error al rechazar la oferta:', error);
    }
  };
  

  const handleUndoOffer = async (offer, project) => {
    try {
      offer.is_reviewed = false;
      offer.status = null;  
  
      const response = await ProjectService.updateOffer(project.id, offer.id, offer);
  
      const updatedProjects = projects.map(p =>
        p.id === project.id
          ? { ...p, offers: p.offers.map(o => (o.id === offer.id ? offer : o)) }
          : p
      );
      setProjects(updatedProjects); 
  
    } catch (error) {
      console.error('Error al deshacer la oferta:', error);
    }
  };

  const handleViewProfile = (freelancerId) => {
    navigate(`/public/profile/${freelancerId}`);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userToken && userToken.access) {
        try {
          const userData = await getUserInfoService(userToken.access);
          const user = userData[0];

          if (user && user.id) {
            setUserInfo(user);
            const workerProjects = await ProjectService.getProjectsByWorkerOffer(user.id);
            const ownerProjects = await getProjectsByOwner(user.id);

            const combinedProjects = [
              ...workerProjects.map(project => ({ ...project, role: 'worker' })),
              ...ownerProjects.map(project => ({ ...project, role: 'owner' })),
            ];
            setProjects(combinedProjects);
          } else {
            console.error('userData es nulo o no tiene id:', userData);
          }
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error);
        }
      }
    };

    fetchUserInfo();
  }, [userToken]);

  const isOwner = selectedProject?.role === 'owner';

  const currentOffers = selectedProject?.offers
    ? selectedProject.offers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  // Separamos las ofertas en no revisadas y revisadas
  const offersUnreviewed = currentOffers.filter(offer => !offer.is_reviewed);
  const offersReviewed = currentOffers.filter(offer => offer.is_reviewed);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center min-h-screen bg-zinc-950 p-4 sm:p-6 lg:p-8">
      <div className="relative flex flex-col w-full max-w-7xl bg-zinc-900 shadow-lg p-6 rounded-lg">
        <div className="bg-zinc-800 p-4 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white">Postulaciones</h1>
        </div>
  
        {/* Selección de proyecto */}
        <div className="mb-6">
          <label htmlFor="projectSelect" className="text-gray-300 text-lg">Selecciona un proyecto:</label>
          <select
            id="projectSelect"
            className="bg-zinc-800 text-white p-2 rounded mt-2 w-full"
            onChange={(e) => {
              const selectedId = e.target.value;
              const project = projects.find(p => p.id === parseInt(selectedId, 10));
              setSelectedProject(project || null);
              setCurrentPage(1); // Resetear la página al seleccionar un nuevo proyecto
            }}
          >
            <option value="">-- Selecciona un proyecto --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title} ({project.role})
              </option>
            ))}
          </select>
        </div>
  
        <div className="flex flex-col md:flex-row w-full mt-6 space-y-6 md:space-y-0 md:space-x-8">
          {/* Mostrar Gestionar Postulaciones si es owner */}
          {isOwner ? (
            <div className="w-full md:w-2/3 space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Gestionar Postulaciones</h2>
              {selectedProject ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-300">{selectedProject.title}</h3>
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row space-y-6 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                    <div className="bg-zinc-800 p-6 shadow-md rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-300">Ofertas No Revisadas</h4>
                      {offersUnreviewed.length > 0 ? (
                        offersUnreviewed.map((offer) => (
                          <OffersCard
                            key={offer.id}
                            offer={offer}
                            project={selectedProject}
                            isOwner={true}
                            onAccept={handleAcceptOffer}
                            onReject={handleRejectOffer}
                            onViewProfile={handleViewProfile}
                            showAcceptRejectButtons={true}
                          />
                        ))
                      ) : (
                        <p className="text-gray-400">No hay ofertas no revisadas.</p>
                      )}
                    </div>
                    <div className="bg-zinc-800 p-6 shadow-md rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-300">Ofertas Revisadas</h4>
                      {offersReviewed.length > 0 ? (
                        offersReviewed.map((offer) => (
                          <div key={offer.id} className="flex justify-between items-center">
                            <OffersCard
                              offer={offer}
                              project={selectedProject}
                              isOwner={true}
                              onAccept={handleAcceptOffer}
                              onReject={handleRejectOffer}
                              onViewProfile={handleViewProfile}
                              undoOffer={handleUndoOffer}
                              showAcceptRejectButtons={false}
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No hay ofertas revisadas.</p>
                      )}
                    </div>
                  </div>
                  <Pagination
                    totalItems={selectedProject.offers.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <p className="text-gray-400">No se ha seleccionado un proyecto aún.</p>
              )}
            </div>
          ) : (
            <div className="w-full md:w-2/3 space-y-6">
              <div className="bg-zinc-800 p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">Historial de Postulaciones</h2>
                {selectedProject ? (
                  <>
                    <h3 className="text-xl font-semibold text-gray-300">{selectedProject.title}</h3>
                    {currentOffers.length > 0 ? (
                      currentOffers.map((offer) => (
                        <OffersCard
                          key={offer.id}
                          offer={offer}
                          project={selectedProject}
                          isOwner={false}
                        />
                      ))
                    ) : (
                      <p className="text-gray-400">No hay ofertas disponibles para este proyecto.</p>
                    )}
                    <Pagination
                      totalItems={selectedProject.offers.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <p className="text-gray-400">No se ha seleccionado un proyecto aún.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente de paginación
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded-md ${i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default ApplicationsScreen;