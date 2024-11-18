import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import HackerRoom from "./HackerRoom.jsx";
import CanvasLoader from "../../components/General/CanvasLoader.jsx";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../../components/constants/index.js";
import Target from "./Target.jsx";
import ReactLogo from "./ReactLogo.jsx";
import Cube from "./cube.jsx";
import Rings from "./Rings.jsx";
import HeroCamera from "./HeroCamera.jsx";
import Button from "../../components/General/Button.jsx";

const Hero = () => {
  // Aquí se calcula el tamaño de los objetos
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 ">
        <p className="sm:text-xl text-2xl font-medium text-white text-center font-generalsans">
          Las mejores oportunidades
          <span className="waving-hand">🫶</span>
        </p>
        <p className="hero_tag text-gray_gradient">están aquí</p>
      </div>
      <div className="w-full h-full absolute inset-0">
        {/* Todos los "objetos" de react-three deben estar dentro de un canvas */}
        <Canvas className="w-full h-full ">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                position={sizes.deskPosition}
                rotation={[0, -Math.PI, 0]}
                scale={sizes.deskScale}
              />
            </HeroCamera>
            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Cube position={sizes.cubePosition} />
              <Rings position={sizes.ringPosition} />
            </group>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#contact" className="w-fit">
          <Button
            name={"Let's rock together"}
            isBeam
            containerClass={"sm:w-fit w-full sm:min-w-96"}
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
