import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTachometerAlt, FaShoppingCart, FaInbox, FaUser, FaUserCircle, FaCog, FaSignOutAlt, FaSuitcase, FaBell } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú en móvil

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleSidebar = () => setIsOpen(!isOpen); // Alternar visibilidad del sidebar

  return (
    <div>
      {/* Botón Hamburguesa */}
      <button
        className="lg:hidden p-4 text-white"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 min-h-screen bg-zinc-950 shadow-lg z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:block`}
      >
        <div className="p-4 text-xl font-bold border-b border-gray-700 text-white">
          Barra Lateral
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <button
            className="flex items-center w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300"
            onClick={() => navigate('/profile/projects')}
          >
            <FaTachometerAlt className="mr-2 text-gray-400" /> Mis proyectos
          </button>

          <button
            className="flex items-center w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300"
            onClick={() => navigate('/profile/payments')}
          >
            <FaShoppingCart className="mr-2 text-gray-400" /> Pagos
          </button>

          <button
            className="flex items-center w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300"
            onClick={() => navigate('/profile/offers')}
          >
            <FaSuitcase className="mr-2 text-gray-400" /> Postulaciones
          </button>

          <button
            className="flex items-center w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300"
            onClick={() => navigate('/profile/messaging')}
          >
            <FaInbox className="mr-2 text-gray-400" /> Mensajería
          </button>

          <button
            className="flex items-center w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300"
            onClick={() => navigate('/profile/notifications')}
          >
            <FaBell className="mr-2 text-gray-400" /> Notificaciones
          </button>

          <button
            className="flex items-center w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300"
            onClick={() => navigate('/profile')}
          >
            <FaUserCircle className="mr-2 text-gray-400" /> Ver Perfil
          </button>

          <button
            className="flex items-center w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300"
            onClick={() => navigate('/profile/edit')}
          >
            <FaUser className="mr-2 text-gray-400" /> Editar Perfil
          </button>

          <button
            className="flex items-center w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300"
            onClick={() => navigate('/profile/configuration')}
          >
            <FaCog className="mr-2 text-gray-400" /> Configuración
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full flex items-center text-left p-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" /> Cerrar sesión
          </button>
        </div>
      </div>

      {/* Overlay para cerrar sidebar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
