import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import hooks to access Redux
import { logout } from "../../redux/actions/userActions"; // Import the logout action
import logo from "../../assets/logoipsum-288.svg";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user login information from Redux store
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  // Function to close the navbar when clicking a link
  const closeNavbar = () => {
    setShowNavbar(false);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/"); // Redirect to home after logging out
  };

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div
          className="md:hidden cursor-pointer"
          onClick={handleShowNavbar}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </div>

        {/* Nav Links */}
        <div
          className={`${
            showNavbar ? "fixed" : "hidden"
          } top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 md:static md:block md:bg-transparent md:h-auto`}
        >
          <ul className="flex flex-col items-center justify-center h-full space-y-6 md:flex-row md:space-y-0 md:space-x-6 md:h-auto text-center">
            <li>
              <NavLink
                to=""
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `block px-4 py-2 md:inline-block ${
                    isActive ? "text-yellow-500" : "hover:text-yellow-300"
                  }`
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/freelancers"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `block px-4 py-2 md:inline-block ${
                    isActive ? "text-yellow-500" : "hover:text-yellow-300"
                  }`
                }
              >
                Freelancers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `block px-4 py-2 md:inline-block ${
                    isActive ? "text-yellow-500" : "hover:text-yellow-300"
                  }`
                }
              >
                Proyectos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `block px-4 py-2 md:inline-block ${
                    isActive ? "text-yellow-500" : "hover:text-yellow-300"
                  }`
                }
              >
                Acerca de
              </NavLink>
            </li>

            {/* Show user-specific links if logged in */}
            {userInfo ? (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    onClick={closeNavbar}
                    className={({ isActive }) =>
                      `block px-4 py-2 md:inline-block ${
                        isActive ? "text-yellow-500" : "hover:text-yellow-300"
                      }`
                    }
                  >
                    Perfil
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 md:inline-block text-red-500 hover:text-red-700"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  onClick={closeNavbar}
                  className={({ isActive }) =>
                    `block px-4 py-2 md:inline-block ${
                      isActive ? "text-yellow-500" : "hover:text-yellow-300"
                    }`
                  }
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
