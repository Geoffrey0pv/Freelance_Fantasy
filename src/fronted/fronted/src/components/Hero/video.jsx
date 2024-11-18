import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const VideoTest = () => {
    return (
        <section className="my-20">
            <div className="container mx-auto px-5">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-16">
                    {/* Left Section: Text */}
                    <div className="lg:w-1/2 w-full text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Nada como FreelanceFantasy
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                            Una visión clara de cómo hemos ayudado a las personas y empresas a alcanzar sus metas.
                        </p>

                        {/* Call to Action Button */}
                        <Link to="/login">
                            <button className="mt-4 px-8 py-4 bg-white hover:bg-blue-700 text-black text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out animate-pulse">
                                Únete a nosotros y empieza ahora
                            </button>
                        </Link>
                    </div>

                    {/* Right Section: Video */}
                    <div className="lg:w-3/4 w-full mx-auto">
                        <div className="relative mx-auto" style={{ paddingBottom: '56.25%', height: 0, maxWidth: '100%' }}>
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=MMNH6fUGzVk"
                                className="absolute top-0 left-0"
                                width="100%"
                                height="100%"
                                controls={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoTest;
