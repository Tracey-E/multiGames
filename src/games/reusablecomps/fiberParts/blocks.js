import React, { useRef } from "react";
import { useThree ,useFrame} from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { useBox, Physics, Debug } from "@react-three/cannon";
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
  
  const ref = useRef();
  const box = useRef();
  return (
    <a.mesh dispose={null} ref={ref}>
      <Box ref={box} position={[l, u, d]} args={[h, w, t]} {...props}>
        <boxGeometry />
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
    friction: 1,
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
function BlocksMix() {
  
  const Block1 = Block;
  const Block2 = Block;
  const Block3 = Block;

  const ref = useRef();
 
  const [box] = useBox(() => ({
    mass: 0,
    type: "Kinematic",

    position: [l, u, d],
   
  }));
  const { spring, bind } = useDraggableObject();
  console.log(spring)
  console.log(bind)
  return (
    <a.mesh ref={box} castShadow dispose={null} {...spring}{...bind()} >
      
       
        <Block1  name="1" position={[l - 2, u, d]} args={[h + 1, w + 1, t]}>
          <boxGeometry />
          <meshLambertMaterial />
        </Block1>

        <Block2 name="2" position={[l + 1, u, d]} args={[h + 2, w + 1, t]}>
          {" "}
          <boxGeometry />
          <meshLambertMaterial />
        </Block2>

        <Block3 name="3" position={[l, u + 1, d]} args={[h + 3, w + 5, t]}>
          {" "}
          <boxGeometry />
          <meshLambertMaterial />
        </Block3>
      
    </a.mesh>
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
      <Physics gravity={[10, 40, 10]} defaultContactMaterial={{ restitution: 0.5, friction: 100 }}>
        <Debug color="black" scale={10.1}>
            {/*children*/}
          <BlocksMix />
        </Debug>
      </Physics>
    </>
  );
}
