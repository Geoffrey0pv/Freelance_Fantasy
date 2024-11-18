import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateImage } from '../../../redux/actions/profileActions';

const EditProfileImageSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileDetails = useSelector((state) => state.profileDetails);
  const { userInfo } = profileDetails;

  // Referencias para los inputs de archivo (ocultos)
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [previewProfileImage, setPreviewProfileImage] = useState(userInfo?.profileImage || '');
  const [previewCoverImage, setPreviewCoverImage] = useState(userInfo?.coverImage || '');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  // Maneja la selección de la imagen y la previsualización
  const handleImageUpload = (file, setImage, setPreview) => {
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Genera una URL temporal para la previsualización
    }
  };

  // Llama a los inputs ocultos cuando se hace clic en la imagen de perfil o portada
  const handleProfileImageClick = () => {
    profileInputRef.current.click();
  };

  const handleCoverImageClick = () => {
    coverInputRef.current.click();
  };

  // Guarda las imágenes
  const handleSaveImages = async (redirect = false) => {
    const formData = new FormData();
    if (profileImage) formData.append('profile_image', profileImage);
    if (coverImage) formData.append('cover_image', coverImage);

    try {
      await dispatch(updateImage(formData));
      setMessage('Las imágenes se han guardado exitosamente');
      setMessageType('success');

      if (redirect) {
        setTimeout(() => navigate('/profile'), 2000); // Redirige después de un breve tiempo
      }
    } catch (error) {
      setMessage('Algo ha salido mal. Inténtelo de nuevo');
      setMessageType('error');
    }
  };

  return (
    <div className="bg-gray-100 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Editar Imágenes de Perfil y Portada</h2>

      {/* Mensaje de éxito o error */}
      {message && (
        <div
          className={`p-4 mb-4 text-center rounded ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      {/* Vista previa de la imagen de portada y de perfil */}
      <div className="relative w-full h-48 bg-gray-300 rounded-lg shadow-lg mb-6 cursor-pointer" onClick={handleCoverImageClick}>
        {previewCoverImage ? (
          <img src={previewCoverImage} alt="Portada" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-lg"></div>
        )}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 w-24 h-24 rounded-full border-4 border-gray-300 overflow-hidden cursor-pointer" onClick={handleProfileImageClick}>
          {previewProfileImage ? (
            <img src={previewProfileImage} alt="Perfil" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-400"></div>
          )}
        </div>
      </div>

      {/* Inputs de archivo ocultos para perfil y portada */}
      <input
        type="file"
        ref={profileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => handleImageUpload(e.target.files[0], setProfileImage, setPreviewProfileImage)}
      />
      <input
        type="file"
        ref={coverInputRef}
        style={{ display: 'none' }}
        onChange={(e) => handleImageUpload(e.target.files[0], setCoverImage, setPreviewCoverImage)}
      />

      {/* Botones para guardar */}
      <div className="flex space-x-4 mt-4 p-8 ">
        <button onClick={() => handleSaveImages(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar y Seguir Editando
        </button>
        <button onClick={() => handleSaveImages(true)} className="bg-green-500 text-white px-4 py-2 rounded">
          Guardar Cambios y Salir
        </button>
      </div>
    </div>
  );
};

export default EditProfileImageSection;
