import React from "react";
import { useBox} from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";


/**const mesh = ref
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.0;
  }); */
/**background box needs solid sides to form surrounding */
function BackgroundBox(props) {
  // const texture1 = useLoader(TextureLoader, "textures/aw1.jpeg");
  const { texture1 } = useTexture({ texture1: "/textures/aw1.jpeg" });
  const [ref,api] =  useBox(() => ({
    mass: -0,
    type: "Static",
    onCollide: (e) => {
      api.position.set(0, 0, 0);
     
    },
  }));
  
  const { x, y, z } = useControls({ x: 11.3, y: 6, z: -1.1 });

  return (
    <>
      <mesh ref={ref} name="BackgroundBox" dispose={null} position={[0,0,-2]}>
      
        <boxGeometry args={[x, y, z]} attach="geometry"  />

        <meshBasicMaterial attach="material" map={texture1} />
        
      </mesh>
    </>
  );
}

export default function MouseBackground() {
  return (
    <>
      <BackgroundBox />
    </>
  );
}
