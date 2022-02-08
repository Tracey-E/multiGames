import React, { useRef } from "react";
import { useFrame, useLoader ,Canvas} from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

function Box() {
  const texture1 = useLoader(TextureLoader, "textures/d1.jpg");
  const texture2 = useLoader(TextureLoader, "textures/d2.jpeg");
  const texture3 = useLoader(TextureLoader, "textures/d3.jpeg");
  const texture4 = useLoader(TextureLoader, "textures/d4.jpeg");
  const texture5 = useLoader(TextureLoader, "textures/aw1.jpeg");
  const texture6 = useLoader(TextureLoader, "textures/d6.jpeg");

  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.04;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[25, 10, 10]} angle={0.15} penumbra={8} />
      <pointLight position={[-10, -10, -10]} />

      <mesh ref={mesh}>
        <boxGeometry args={[20, 15, 15]} />
        <boxBufferGeometry attach="geometry" />
        <meshStandardMaterial attachArray="material" map={texture1} />
        <meshStandardMaterial attachArray="material" map={texture2} />
        <meshStandardMaterial attachArray="material" map={texture3} />
        <meshStandardMaterial attachArray="material" map={texture4} />
        <meshStandardMaterial attachArray="material" map={texture5} />
        <meshStandardMaterial attachArray="material" map={texture6} />
      </mesh>
    </>
  );
}

export function Dices() {
  return (
    <>
    <Canvas>
      <Box />
      </Canvas>
    </>
  );
}
