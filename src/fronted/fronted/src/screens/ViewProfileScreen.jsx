import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import ViewProfileImageSection from '../components/Profile/View/ProfileImageSection';
import ViewSkillsSection from '../components/Profile/View/SkillsSection';
import ViewExperienceSection from '../components/Profile/View/ExperienceSection';
import ViewEducationSection from '../components/Profile/View/EducationSection';
import ViewPortfolioSection from '../components/Profile/View/PortfolioSection';
import ViewRatingSection from '../components/Profile/View/RatingSection';
import { 
  getUserImages, 
  getUserProfile, 
  getUserEducation, 
  getUserExperience, 
  getUserPortfolioProjects, 
  getUserRating, 
  getUserSkills 
} from '../redux/actions/profileActions';

const ViewProfileScreen = () => {
  const dispatch = useDispatch();

  const profileDetails = useSelector((state) => state.profileDetails);
  const educationDetails = useSelector((state) => state.educationDetails);
  const experienceDetails = useSelector((state) => state.experienceDetails);
  const portfolioDetails = useSelector((state) => state.portfolioDetails);
  const ratingDetails = useSelector((state) => state.ratingDetails);
  const skillsDetails = useSelector((state) => state.skillsDetails);
  const profileImages = useSelector((state) => state.profileImages); 

  const { loading, error, userInfo } = profileDetails;
  const { education } = educationDetails;
  const { experience } = experienceDetails;
  const { projects } = portfolioDetails;
  const { rating } = ratingDetails;
  const { skills } = skillsDetails;
  const { profileImage, coverImage } = profileImages;

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserEducation());
    dispatch(getUserExperience());
    dispatch(getUserPortfolioProjects());
    dispatch(getUserRating());
    dispatch(getUserSkills()); 
    dispatch(getUserImages());
  }, [dispatch]);

  if (loading) {
    return <p className="text-gray-300">Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-zinc-950 py-6">
      <div className="relative flex flex-col w-full max-w-7xl bg-zinc-900 shadow-lg rounded-lg overflow-hidden">
        
        {/* Imagen de perfil y de fondo */}
        <ViewProfileImageSection 
          profileImage={profileImage} 
          coverImage={coverImage} 
        />

        <div className="flex flex-col md:flex-row w-full mt-6 space-y-6 md:space-y-0 md:space-x-8 p-6">
          
          {/* Información del Usuario */}
          <div className="w-full md:w-1/3 bg-zinc-800 p-6 shadow-md rounded-lg border border-zinc-700">
          <h1 className="text-2xl font-semibold text-gray-100 mb-4">Nombre de usuario</h1>
            <div className="p-4 mb-4 bg-zinc-900 border border-zinc-700 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-100">
                {userInfo?.username || 'Nombre no disponible'}
              </h2>
            </div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Información del Usuario</h2>
            <p className="text-gray-400 mb-2">
              <strong>País:</strong> {userInfo?.country || 'No especificado'}
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Ciudad:</strong> {userInfo?.city || 'No especificado'}
            </p>
            <p className="text-gray-400 mb-4">
              <strong>Tipo de Cuenta:</strong> {userInfo?.account_type || 'No especificado'}
            </p>
            <h2 className="text-lg font-medium text-gray-200 mb-2">Descripción</h2>
            <p className="text-gray-400 mb-6">
              {userInfo?.description || 'No hay descripción disponible'}
            </p>
            
            {/* Habilidades */}
            <h3 className="text-lg font-medium text-gray-200 mb-2">Habilidades</h3>
            <ViewSkillsSection skills={skills || []} />
            
            {/* Contacto */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-200 mb-2">Contacto</h3>
              <div className="flex space-x-4">
                <a href={`mailto:${userInfo?.email}`} className="text-gray-400 hover:text-white">
                  <FaEnvelope size={24} />
                </a>
                <a href={userInfo?.links?.linkedin_url} className="text-gray-400 hover:text-white">
                  <FaLinkedin size={24} />
                </a>
                <a href={userInfo?.links?.github_url} className="text-gray-400 hover:text-white">
                  <FaGithub size={24} />
                </a>
                <a href={userInfo?.links?.twitter_url} className="text-gray-400 hover:text-white">
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Sección Principal */}
          <div className="w-full md:w-2/3 space-y-6">
            <ViewExperienceSection experiences={experience || []} />
            <ViewEducationSection education={education || []} />
            <ViewPortfolioSection projects={projects || []} />
            <ViewRatingSection rating={rating || null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileScreen;
