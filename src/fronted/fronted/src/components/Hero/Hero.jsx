import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { useNavigate } from 'react-router-dom';
import Cats from '../../screens/cats.jsx';
import CanvasLoader from '../General/CanvasLoader.jsx';

const Hero = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/login'); 
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:items-stretch bg-transparent gap-5 lg:gap-10 py-10 px-4 lg:px-20">
            {/* Left Section */}
            <div className="lg:w-1/2 w-full flex flex-col justify-center space-y-8">
                <div className="space-y-6 lg:space-y-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-center lg:text-left">
                        Las mejores oportunidades y servicios personalizados
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-white text-center lg:text-justify">
                        Descubre oportunidades laborales y servicios personalizados. Conectamos freelancers con proyectos relevantes.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center lg:justify-start">
                        <button
                            className="px-5 py-2 bg-white text-black font-bold rounded-md mb-4 sm:mb-0"
                            onClick={handleStartClick}
                        >
                            ¡Empieza ahora!
                        </button>
                        <button className="px-5 py-2 bg-gray-900 text-white font-bold rounded-md">
                            ↗️ Más Información
                        </button>
                    </div>
                    <div className="flex items-center h-12 bg-gray-100 rounded-md px-4 max-w-lg w-full mx-auto lg:mx-0">
                        <input
                            type="text"
                            placeholder="Busca proyectos o Freelancers!"
                            className="bg-transparent flex-grow outline-none"
                        />
                        <button className="px-4 bg-gray-900 text-white rounded-md h-full">
                            Buscar
                        </button>
                    </div>
                </div>
                <div className="space-y-2 text-center lg:text-left">
                    <p className="text-sm text-white">✔️ 30 días de garantía de devolución de dinero</p>
                    <p className="text-sm text-white">✔️ Suscripción mensual</p>
                </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader />}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <Cats />
                    </Suspense>
                </Canvas>
            </div>

            <Leva collapsed={false} />
        </div>
    );
};


export default Hero;
