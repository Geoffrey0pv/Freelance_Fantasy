import React from "react";

import ListingHero from "@/components/ListingProjects/ListingHero.jsx";
import About from "@/components/ListingProjects/about.jsx";
import FAQ from "@/components/ListingProjects/faq.jsx";

const AboutScreen = () => {
    return (
        <main className="max-w-7xl mx-auto relative">
            <ListingHero />
            <About />
            <FAQ />
        </main>
    );
};

export default AboutScreen;