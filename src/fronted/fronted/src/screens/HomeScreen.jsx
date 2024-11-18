// src/screens/HomeScreen.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '../redux/actions/projectActions';
import Hero from "../components/Hero/Hero.jsx";
import SponsorBanner from "../components/Hero/SponsorBanner.jsx";
import FeaturedFreeLancers from "../components/Hero/FeaturedFreeLancers.jsx";
import Feats from "../components/Hero/Feats.jsx";
import Testimonial from "../components/Hero/Testimonial.jsx";
import VideoTest from "../components/Hero/video.jsx";
import CarouselHome from '../components/Hero/CarouselHome';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { projects, loading } = useSelector((state) => state.projectList);

    useEffect(() => {
        dispatch(listProjects(1, 15)); // Obtener los últimos 15 proyectos
    }, [dispatch]);

    return (
        <div>
            <Hero />
            <Feats />
            <SponsorBanner />

            {/* Carrusel de nuestros últimos proyectos */}
            {projects.length > 0 && <CarouselHome projects={projects} />}

            <Testimonial />
            <VideoTest />
            <FeaturedFreeLancers />
        </div>
    );
};

export default HomeScreen;
