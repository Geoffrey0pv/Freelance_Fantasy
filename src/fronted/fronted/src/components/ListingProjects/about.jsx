import { useState } from 'react';
import Globe from 'react-globe.gl';
import React from 'react'
import Button from './components/button.jsx';

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('contacto@freelancefantasy.dev');
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    };

    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="../../../src/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

                        <div>
                            <p className="grid-headtext">Bienvenidos a Freelance Fantasy</p>
                            <p className="grid-subtext">
                                Somos un equipo dinámico de desarrolladores apasionados por crear soluciones innovadoras,
                                basadas en datos y centradas en el usuario. Desde sitios web hasta aplicaciones web,
                                trabajamos para ofrecer experiencias excepcionales que cumplan con tus objetivos.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="../../../src/assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

                        <div>
                            <p className="grid-headtext">Nuestra Tecnología</p>
                            <p className="grid-subtext">
                                Nuestro equipo domina una variedad de herramientas y tecnologías de vanguardia,
                                como React, Next.js y Three.js para aplicaciones interactivas, además de Python
                                para soluciones basadas en datos y aprendizaje automático.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0, 0, 0, 0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[
                                    { lat: 3.43722, lng: -76.5225, text: 'Cali, Colombia', color: 'white', size: 15 },
                                    { lat: 40.7128, lng: -74.006, text: 'Nueva York, EE.UU.', color: 'white', size: 15 }
                                ]}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">Colaboración Global</p>
                            <p className="grid-subtext">
                                Nuestro equipo está ubicado en diferentes partes del mundo, incluyendo Cali, Colombia y Estados Unidos.
                                Nos adaptamos a tu zona horaria y estamos entusiasmados por trabajar con clientes en todo el mundo.
                            </p>
                            <Button name="Trabaja con Nosotros" isBeam containerClass="w-full mt-10" />
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img src="../../../src/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

                        <div>
                            <p className="grid-headtext">¿Por qué Freelance Fantasy?</p>
                            <p className="grid-subtext">
                                Nos comprometemos a resolver problemas complejos con soluciones elegantes.
                                Ya sea creando sitios web visualmente impactantes o desarrollando sistemas backend potentes,
                                damos lo mejor de nosotros en cada proyecto que emprendemos.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img
                            src="../../../src/assets/grid4.png"
                            alt="grid-4"
                            className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
                        />

                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contáctanos</p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">contacto@freelancefantasy.dev</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
