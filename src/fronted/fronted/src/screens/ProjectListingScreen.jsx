import React, { useEffect, useState } from 'react';
import SearchProjectsBar from '../components/ListingProjects/SearchProjectsBar';
import FiltersDropdown from '../components/ListingProjects/FiltersDropdown';
import ProjectCard from '../components/ListingProjects/ProjectCard';
import Pagination from '../components/ListingFreelancers/Pagination';
import { getUserInfoService } from '@/service/userService';
import ProjectService from '@/service/projectService';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects, listProductDetails, createProjectOffer } from '../redux/actions/projectActions';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ProjectDetails from '../components/ListingProjects/ProjectDetails';
import OfferForm from '../components/ListingProjects/OfferForm';

// Configura el elemento raíz para react-modal
Modal.setAppElement('#root');

const ProjectListingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ tag: '', location: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const { projects, loading, error, page, pages } = useSelector((state) => state.projectList);
  const { project, loading: detailsLoading, error: detailsError } = useSelector((state) => state.projectDetails);
  const isAuthenticated = useSelector((state) => state.userLogin);
  const { userLogin: { userInfo: userToken } } = useSelector((state) => state);

  useEffect(() => {
    dispatch(listProjects(page || 1, 10, filters.tag, filters.location));
  }, [dispatch, page, filters]);

  const handleMoreInfoClick = (projectId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/projects/${projectId}` } });
    } else {
      dispatch(listProductDetails(projectId));
      setSelectedProject(projectId);
      setIsDetailsOpen(true);
    }
  };

  const handleMakeOffer = () => {
    setIsOfferOpen(true);
  };

  const handleSubmitOffer = async (offerData) => {
    if (selectedProject) {
      try {
        const userData = await getUserInfoService(userToken.access);
        const user = userData[0];
        const projectOwnerId = project.user.id;

        if (user.id === projectOwnerId) {
          setResponseMessage('No puedes crear una oferta en tu propio proyecto.');
          setIsResponseModalOpen(true);
          setTimeout(() => {
            setIsResponseModalOpen(false);
          }, 3000);
          return;
        }

        const response = await dispatch(createProjectOffer(selectedProject, offerData));
        setResponseMessage('¡Oferta creada exitosamente!');
      } catch (error) {
        setResponseMessage('Hubo un error al crear la oferta.');
      } finally {
        setIsOfferOpen(false);
        setIsResponseModalOpen(true);
        setTimeout(() => {
          setIsResponseModalOpen(false);
          setIsDetailsOpen(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header con barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-zinc-800 sticky top-0 z-10 space-y-4 sm:space-y-0">
        <SearchProjectsBar onSearch={setSearchQuery} />
        <FiltersDropdown onFilterSelect={(newFilters) => setFilters(newFilters)} />
      </div>

      {loading ? (
        <p className="text-center text-white mt-8">Cargando...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-8">Error: {error}</p>
      ) : (
        <>
          {/* Grilla responsiva de proyectos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:gap-6 md:p-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                bannerUrl={project.photo || 'https://via.placeholder.com/600x400'}
                tags={project.tags || []}
                onMoreInfoClick={() => handleMoreInfoClick(project.id)}
              />
            ))}
          </div>
          <Pagination currentPage={page || 1} totalPages={pages || 1} />
        </>
      )}

      {/* Modal de detalles del proyecto */}
      <Modal
        isOpen={isDetailsOpen}
        onRequestClose={() => setIsDetailsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            height: 'auto',
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '20px',
            borderRadius: '10px',
          },
        }}
      >
        {detailsLoading ? (
          <p>Cargando detalles...</p>
        ) : detailsError ? (
          <p>Error: {detailsError}</p>
        ) : (
          <ProjectDetails project={project} onMakeOffer={handleMakeOffer} />
        )}
      </Modal>

      {/* Modal para realizar oferta */}
      <Modal
        isOpen={isOfferOpen}
        onRequestClose={() => setIsOfferOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
          },
        }}
      >
        <OfferForm onSubmit={handleSubmitOffer} />
      </Modal>

      {/* Modal para respuesta de la petición */}
      <Modal
        isOpen={isResponseModalOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1100,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
            padding: '20px',
          },
        }}
      >
        <p>{responseMessage}</p>
      </Modal>
    </div>
  );
};

export default ProjectListingScreen;
