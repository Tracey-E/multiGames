import * as THREE from "three";
import React, { Suspense } from "react";
import { useThree, Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Box } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import { useSpring, a } from "@react-spring/three";

/**blocks for sliders all need to be solid state so cant pass through each other */
function Block(props) {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],

    config: { friction: 80 },
  }));
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) =>
      set({
        position: [x / aspect, -y / aspect, 0],
        rotation: [y / aspect, x / aspect, 0],
      }),
  });

  return (
    <a.mesh {...spring} {...bind()} castShadow>
      <Box args={[2, 1, 1]}>
        <meshNormalMaterial color={Math.random() * 0xffffff} />
      </Box>
    </a.mesh>
  );
}
/**to get multiple blocks in  the game */
function BlocksMix() {
  return (
    <mesh camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}>
      <ambientLight intensity={0.3} />
      <pointLight intensity={0.8} position={[5, 0, 5]} />
      <Physics>
        <group>
          <Block position={[2, -1, 0]} />
          <Block position={[-1, 0, 0]} />
          <Block position={[1, 0, 0]} />
        </group>
      </Physics>
    </mesh>
  );
}
export function BlocksMixes() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <BlocksMix />
      </Suspense>
    </Canvas>
  );
}
