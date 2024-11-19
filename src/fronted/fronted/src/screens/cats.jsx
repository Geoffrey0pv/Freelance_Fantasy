import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Cats = () => {
  const groupRef = useRef();
  const gltf = useGLTF("/book_model/scene.gltf");

  // Variable para controlar el tiempo y la velocidad de la flotación
  let floatSpeed = 0.5; // Ajusta este valor para cambiar la velocidad de la flotación
  let initialY = 1;     // Posición inicial en el eje Y

  useFrame((state) => {
    if (groupRef.current) {
      // Modifica la posición en Y para hacer que flote arriba y abajo
      groupRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.2;
    }
  });


  return (
    <group 
      ref={groupRef} 
      dispose={null} 
      scale={[0.09, 0.09, 0.09]}  // Ajusta el tamaño aquí (0.3 para hacer el modelo más pequeño)
      position={[0, 0, -7]}    // Ajusta la posición del modelo
      rotation={[Math.PI / 3, 0, 0]}
    >
      <primitive object={gltf.scene} />
    </group>
  );
};

export default Cats;
