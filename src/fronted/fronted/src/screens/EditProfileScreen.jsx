import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfileImageSection from '../components/Profile/Edit/EditProfileImageSection';
import EditProfileInfoSection from '../components/Profile/Edit/EditProfileInfoSection';
import EditSkillsSection from '../components/Profile/Edit/EditSkillsSection';
import EditEducationSection from '../components/Profile/Edit/EditEducationSection';
import EditExperienceSection from '../components/Profile/Edit/EditExperienceSection';
import EditPortfolioSection from '../components/Profile/Edit/EditPortfolioSection';
import { updateUserProfile, updateSkills, updateEducation, updateExperience, updatePortfolio } from '../redux/actions/profileActions';

const EditProfileScreen = () => {
  const dispatch = useDispatch();

  // Obtener datos del usuario desde Redux
  const profileDetails = useSelector((state) => state.profileDetails);
  const { userInfo } = profileDetails;
  const skillsDetails = useSelector((state) => state.skillsDetails);
  const { skills } = skillsDetails;
  const educationDetails = useSelector((state) => state.educationDetails);
  const { education } = educationDetails;
  const experienceDetails = useSelector((state) => state.experienceDetails);
  const { experience } = experienceDetails || {};
  const portfolioDetails = useSelector((state) => state.portfolioDetails);
  const { portfolioList } = portfolioDetails || [];

  // Datos del perfil
  const [profileData, setProfileData] = useState({
    country: userInfo?.country || '',
    city: userInfo?.city || '',
    phone_number: userInfo?.phone_number || '',
    description: userInfo?.description || '',
  });

  // Manejo de acciones
  const handleProfileUpdate = () => dispatch(updateUserProfile(profileData));
  const handleSkillsUpdate = (newSkills) => dispatch(updateSkills(newSkills));
  const handleEducationUpdate = (newEducation) => dispatch(updateEducation(newEducation));
  const handleExperienceUpdate = (newExperience) => dispatch(updateExperience(newExperience));
  const handlePortfolioUpdate = (newPortfolio) => dispatch(updatePortfolio(newPortfolio));

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950">
      <div className="w-full max-w-4xl bg-zinc-950 text-black rounded-lg shadow-lg p-6 md:p-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 text-center">Editar Perfil</h1>
        
        {/* Secciones de edición */}
        <EditProfileImageSection />
        <EditProfileInfoSection
          profileData={profileData}
          setProfileData={setProfileData}
          onSave={handleProfileUpdate}
        />
        <EditSkillsSection skills={skills} onSave={handleSkillsUpdate} />
        <EditEducationSection educationList={education} onSave={handleEducationUpdate} />
        <EditExperienceSection experienceData={experience} onSave={handleExperienceUpdate} />
        <EditPortfolioSection portfolioList={portfolioList} onSave={handlePortfolioUpdate} />
      </div>
    </div>
  );
};

export default EditProfileScreen;
