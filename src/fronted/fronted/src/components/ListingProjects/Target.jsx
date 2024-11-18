import React, { useRef } from 'react';
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Target = (props) => {
    const targetRef = useRef();
    const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf");

    useGSAP(() => {
        // Esto es básicamente para mover el objeto, y que se mueva en el eje Y
        gsap.to(targetRef.current.position, {
            y: targetRef.current.position.y - 0.5,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
        });
    });

    return (
        <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={2}>
            {/* 
                Recuerden que antes, para crear un mesh debíamos pasar la geometría y el material del objeto.
                Con "primitive" se hace automáticamente.
            */}
            <primitive object={scene} />
        </mesh>
    );
}

export default Target;
