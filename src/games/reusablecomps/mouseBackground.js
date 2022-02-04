import React, { useRef, Suspense } from "react";
import { useFrame, useLoader, Canvas } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { useTexture } from "@react-three/drei";

/**background box needs solid sides to form surrounding */
function MousePlane() {
  // const texture1 = useLoader(TextureLoader, "textures/aw1.jpeg");
  const { texture1 } = useTexture({ texture1: "/textures/aw1.jpeg" });

  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.0;
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[25, 10, 10]} angle={0.15} penumbra={8} />
      <pointLight position={[-10, -10, -10]} />

      <mesh ref={mesh}>
        <boxGeometry args={[8, 7, -1]} />
        <boxBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" map={texture1} />
      </mesh>
    </>
  );
}

export function MouseBackground() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <MousePlane />
      </Suspense>
    </Canvas>
  );
}
