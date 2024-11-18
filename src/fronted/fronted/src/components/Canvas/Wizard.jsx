import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Wizard = () => {
  const Wizard = useGLTF("../public/scene.gltf");

  return (
    <primitive object={Wizard.scene} scale={2.5} position-y={-2.5} position-x={-0.5} rotation-y={-1} />
  );
};

const WizardCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-5, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <hemisphereLight intensity={4} groundColor="black" />
        <pointLight intensity={4} />
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Wizard />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default WizardCanvas;