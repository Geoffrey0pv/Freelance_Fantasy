// src/components/CarouselHomeScreen.jsx

import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "../ListingProjects/projectCard.jsx";

const CarouselHome = ({ projects }) => {
    return (
        <div className="my-10">

            <h3 className="head-text text-center">Nuestros últimos proyectos</h3>

            <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent>
                    {projects.map((project) => (
                        <CarouselItem key={project.id} className="w-full sm:w-1/3 p-2"> {/* Mostrar 3 items */}
                            <div className="p-2">
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    bannerUrl={project.photo || 'https://via.placeholder.com/600x400'}
                                    tags={project.tags || []}
                                    onMoreInfoClick={() => console.log(`Ver más de ${project.id}`)}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CarouselHome;
