import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 py-8 px-4 lg:py-16 lg:px-8"> {/* Ajustar padding según el tamaño */}
      <div className="container mx-auto flex flex-col items-center">
        {/* Sección principal del footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full mb-8 space-y-8 lg:space-y-0">
          {/* Más Información */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-white text-lg font-bold mb-4">Más información</h4>
            <a href="/FAQ" className="text-gray-400 hover:text-white text-sm">
              FAQ
            </a>
            <a href="/Historia" className="text-gray-400 hover:text-white text-sm">
              Historia
            </a>
          </div>

          {/* ¿Qué buscas? */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-white text-lg font-bold mb-4">¿Qué buscas?</h4>
            <a href="/Freelancers" className="text-gray-400 hover:text-white text-sm">
              Freelancers
            </a>
            <a href="/Projects" className="text-gray-400 hover:text-white text-sm">
              Proyectos
            </a>
          </div>

          {/* Contáctanos */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-white text-lg font-bold mb-4">Contáctanos</h4>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href="https://instagram.com">
                <img src="img_3.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://twitter.com">
                <img src="img_1.png" alt="Twitter" className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com">
                <img src="img_4.png" alt="LinkedIn" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisora */}
        <hr className="border-gray-700 w-full my-6" />

        {/* Enlaces secundarios */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="/terms" className="text-gray-400 hover:text-white text-sm">
              Términos & Condiciones
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacidad
            </a>
            <a href="/security" className="text-gray-400 hover:text-white text-sm">
              Seguridad
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookies
            </a>
          </div>
        </div>

        {/* Derechos reservados */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            © 2024. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
