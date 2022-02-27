import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";

export function Walls() {
  const { viewport } = useThree();
  console.log(viewport);
     const z = viewport.distance * 1;
  const x = viewport.width * 0.45;
   const y = viewport.height * 0.45;

  // back, front
    const [backRef] = usePlane(() => ({
     position: [0, 0, -z],
     color:"red"
  //     rotation: [0, 0, 0],
     }));
  const [frontRef] = usePlane(() => ({
        position: [0, 0, z],
        color:"pink",
    //     rotation: [0, -Math.PI, 0],
  }));

  // left, right
     const [leftRef] = usePlane(() => ({
      position: [x, 0, 0],
      color:"blue",
  //     rotation: [0, -Math.PI / 2, 0],
    }));
    const [rightRef] = usePlane(() => ({
     position: [-x, 0, 0],
     color:"grey",
  //     rotation: [0, Math.PI, 0],
    }));

  // // top
  // usePlane(() => ({
  //   position: [0, y, 0],
  //   rotation: [Math.PI / 2, 0, 0],
  // }));
  // bottom
   usePlane(() => ({
    position: [0, -y, 0],
  //   rotation: [-Math.PI / 2, 0, 0],
   }));  
  return (
    <>
      <mesh ref={frontRef} />
       <mesh ref={leftRef} /> 
       <mesh ref={rightRef} /> 
       <mesh ref={backRef} />
    </>
  );
}
