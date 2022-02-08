import React, { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { useBox, Physics } from "@react-three/cannon";
import { useGesture } from "@use-gesture/react";
import { useSpring, a } from "@react-spring/three";

/**position left/right up/down distance*/
const l = 0;
const u = 0;
const d = 0;

/**size height,width,depth*/
const h = 1;
const w = 1;
const t = 1;

/**blocks for sliders all need to be solid state so cant pass through each other */

function Block(props) {
  const { spring, bind } = useDraggableObject();
  const ref = useRef();
  const box = useRef();
  return (
    <a.mesh {...spring} {...bind()} dispose={null} ref={ref}>
      <Box ref={box} position={[l, u, d]} {...props}>
        <boxGeometry args={[h, w, t]} />
        <meshPhysicalMaterial
          attach="material"
          color={Math.random() * 0xffffff}
          roughness={9}
        />
      </Box>
    </a.mesh>
  );
}

/**used to drag objects */
function useDraggableObject() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [l, u, d],
    friction: 10,
  }));
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) =>
      set({
        position: [x / aspect, -y / aspect, 0],
      }),
  });

  return { spring, bind };
}
/**to get multiple blocks in  the game */
function BlocksMix(props) {
  const Block1 = Block;
  const Block2 = Block;
  const Block3 = Block;

  const ref = useRef();
  const [box] = useBox(() => ({
    mass: 0,
    type: "Dynamic",

    position: [l, u, d],
    ...props,
  }));

  return (
    <mesh ref={ref} castShadow>
      <group ref={box} {...props} dispose={null}>
        <Block1 name="1" position={[l - 2, u, d]}>
          <boxGeometry args={[h + 1, w + 1, t]} />
          <meshLambertMaterial />
        </Block1>

        <Block2 name="2" position={[l + 1, u, d]}>
          {" "}
          <boxGeometry args={[h + 1, w + 1, t]} />
          <meshLambertMaterial />
        </Block2>

        <Block3 name="3" position={[l, u + 1, d]}>
          {" "}
          <boxGeometry args={[h, w + 1, t]} />
          <meshLambertMaterial />
        </Block3>
      </group>
    </mesh>
  );
}

const Lighting = () => {
  return (
    <mesh
      camera={{ position: [l, u, d], near: 0.5, far: 1000 }}
      name="lighting"
    >
      <spotLight position={[25, 10, 10]} angle={0.15} penumbra={8} castShadow />
      <ambientLight intensity={0.5} />
      <pointLight intensity={0.5} position={[5, 0, 5]} />
    </mesh>
  );
};
export default function BlocksMixes() {
  return (
    <>
      <Lighting />
      <Physics defaultContactMaterial={{ restitution: 55, friction: 100 }}>
        <BlocksMix />
      </Physics>
    </>
  );
}
