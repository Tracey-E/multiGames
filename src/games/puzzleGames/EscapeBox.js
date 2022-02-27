import { Debug, Physics, useBox, usePlane } from "@react-three/cannon";
// eslint-disable-next-line no-unused-vars
import { useTexture,GizmoViewport,GizmoHelper } from "@react-three/drei";
//import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDragConstraint, Cursor } from "../reusablecomps/fiberParts/moveObject";
// eslint-disable-next-line no-unused-vars
import * as THREE from "three";


/**EXTRA bits to help */

/**CANVAS components */

/**background  base plane  */

const OuterBox = (props) => {
  const { texture1 } = useTexture({ texture1: "/textures/aw1.jpeg" });
  const [ref] = usePlane(() => ({
    type: "Static",

  
    ...props,
  }));

  return (
    <>
      <mesh ref={ref} name="outerBox" receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshBasicMaterial attach="material" map={texture1} />
      </mesh>
    </>
  );
};

/**containing walls */

function Boxs({ args, props, position }) {
  const { texture1 } = useTexture({ texture1: "/textures/aw1.jpeg" });

  const [ref] = useBox(() => ({
    type: "Static",
    
    collisionResponse: true,
    args,
    position,
    ...props,
  }));
  return (
    <>
      <mesh {...props} ref={ref} receiveShadow>
        <boxBufferGeometry args={args} position={position} />
        <meshBasicMaterial attach="material" map={texture1} />
      </mesh>
    </>
  );
}

/**lighting1 and camera effects for canvas*/

// eslint-disable-next-line no-unused-vars
function Lighting1() {
  return (
    <mesh name="lighting">
      <spotLight
      castShadow
        position={[-20, 7, -7]}
       
        angle={0.55}
        penumbra={1}
      
        intensity={1}
      />
      <ambientLight intensity={0.5} />
      <pointLight intensity={5} position={[5, 0, 5]} color="white" />
    </mesh>
  );
}

/**SCENE components {Math.random() * 0xffffff} */

function Block(props) {
  const [Blocky] = useBox(() => ({
    type: "Dynamic",
    mass: 5,
    
    collisionResponse: true,
    friction: 10,

    

    ...props,
  }));
  const bind = useDragConstraint(Blocky);

  return (
    <mesh ref={Blocky} {...bind} dispose={null} scale={[25, 5, 5]}>
      <boxGeometry />
      <meshLambertMaterial attach="material" color={Math.random() * 0xffffff} />
    </mesh>
  );
}

/** group of blocks to place in container box */

/**mouse block      */

function Mouse(props) {
  const [Mousey] = useBox(() => ({
    type: "Dynamic",
    mass: 5,
   
    collisionResponse: true,
    friction: 1,
    force:1,
   
  
    ...props,
  }));

  const bind = useDragConstraint(Mousey);
  return (
    <mesh ref={Mousey} {...bind} dispose={null} scale={[10, 5, 5]} >
      <boxGeometry />
      <meshNormalMaterial attach="material" color="brown" />
    </mesh>
  );
}

/**exit marker */

function Exit(props) {
  const [ref] = useBox(() => ({
    mass: 15,
    type: "Static",
    ...props,
  }));

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[4, 10, 15]} />
      <meshNormalMaterial attach="material" color='black'/>
    </mesh>
  );
}

/**lighting2 effects for inner blocks */

/**COMBINING canvas components */

/**canvas = lighting1 and background  */
/**function Canvas1() {
  return (
    <group>
      <Lighting1 />
      <OuterBox rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}  shadows />
      <Boxs position={[0, 0, 0]} args={[10, 10, 2]} rotation={[-Math.PI / 2, 0, 0]}/>
      <Boxs position={[40, 0, 0]} args={[2, 10, 50]} rotation={[-Math.PI / 2, 0, 0]} />
      <Boxs position={[0, 0, 0]} args={[2, 10, 50]} rotation={[-Math.PI / 2, 0, 0]}/>
      <Boxs position={[0, 0, 0]} args={[2, 10, 50]} rotation={[-Math.PI / 2, 0, 0]}/>
    
    </group>
  );
}*/

/**COMBINING  scene components */

/**scene lighting2 and all  blocks */
/*function Scene() {
  return (
    <group>
      <Block position={[0, 10, 0]} rotation={[-Math.PI / 2, 0, 0]}/>
      <Mouse position={[-10, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}/>
      <Exit position={[10, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}/>
    </group>
  );
}*/
/**COMBINING  all components for export */
/**function CanvasAndScene() {
  return (
    <>
     
      <Scene />
    </>
  );
}*/
/**export function */
export default function MouseEscape() {
  //console.log(Cursor.position);
  return (
    <div id="MouseEscape">
      <Canvas 
     
      camera={{ position: [0, 45, 50], fov: 70, near: 1, far: 150 }}>
        <Lighting1 />
     
        <Physics
          allowSleep={false}
          
          iterations={80}
          broadphase = 'Naive'
          gravity={[0, -350, 0]}
          defaultContactMaterial={{   
              friction: 10,
           
           
             }}
          
          tolerance={[1]}
        >
          <Debug color="black">
            <Cursor  />
          </Debug>

          <group>
             {/** plane*/}
            <OuterBox
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -20, -50]}
            />
            {/** front wall*/}
            <Boxs
              position={[0, -15, 29]}
              args={[100, 15, 5]}
              rotation={[-Math.PI / 2, 0, 0]}
              transparent
              
            />
            {/** right wall*/}
            <Boxs
              position={[54, -10, 0]}
              args={[5, 90, 100]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
              {/** back wall*/}
            <Boxs
              position={[0, -10, -50]}
              args={[100, 90, 5]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
             {/** left wall*/}
            <Boxs
              position={[-50, -10, 0]}
              args={[5, 90, 100]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            {/** exit block for collision of mouse*/}
            <Exit position={[53, -15, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          </group>
          <group>
             {/** blocking blocks*/}
            <Block position={[0, -19, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <Block position={[10, -10, 10]} rotation={[-Math.PI / 2, 0, 0]} />

            <Mouse position={[-30, 0, 0]} color="brown" />
          </group>
        </Physics>
      </Canvas>
    </div>
  );
}
//{{ position: [-1, 45, 55], fov: 55 }}
