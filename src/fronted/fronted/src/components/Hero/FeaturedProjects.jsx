import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectCard from '../ListingProjects/projectCard';

const FeaturedProjects = () => {
    // State variables to hold projects data, loading status, and errors
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to navigate programmatically

    // useEffect hook to fetch the projects data from the server
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/'); // Adjust the URL if necessary
                if (!response.ok) {
                    throw new Error('Error al obtener los proyectos');
                }
                const data = await response.json();

                // Check if data.projects exists and is an array
                if (data.projects && Array.isArray(data.projects)) {
                    setProjects(data.projects); // Set the projects state with the fetched projects
                } else {
                    throw new Error('No se encontraron proyectos');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchProjects();
    }, []);

    // Render loading message while fetching data
    if (loading) {
        return <div className="text-center text-white">Cargando proyectos...</div>;
    }

    // Render error message if an error occurred during fetch
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    // Function to handle "More Info" button click
    const handleMoreInfoClick = (projectId) => {
        // Navigate to the project detail page
        navigate(`/projects/${projectId}`);
    };

    return (
        <section className="relative my-20">
            {/* Header centered */}
            <div className="relative mb-4 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    Nuestros últimos proyectos lanzados
                </h2>
            </div>

            {/* Link row aligned to the right */}
            <div className="flex justify-end mb-12">
                <Link
                    to="/projects"
                    className="text-white font-semibold hover:text-gray-300 transition-colors text-sm sm:text-base"
                >
                    Ver más
                </Link>
            </div>

            {/* Projects grid */}
            <div className="container mx-auto px-5">
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.isArray(projects) && projects.slice(0, 3).map((project) => (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                description={project.description || 'Descripción no disponible'}
                                bannerUrl={`http://127.0.0.1:8000${project.photo}`}
                                tags={project.tags || []}
                                onMoreInfoClick={() => handleMoreInfoClick(project.id)} // Pass id to handler
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
