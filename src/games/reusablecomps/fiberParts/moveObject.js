import { createRef, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { usePointToPointConstraint, useBox } from "@react-three/cannon";


/**export function Move() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({
    position: [0, 0, 0],
    config: { mass: 0, friction: 140, tension: 1800 },
  }));

  const bind = useDrag(
    ({ offset: [x, y] }) => set({ position: [x / aspect, -y / aspect, 0] }),
    {
      eventOptions: { pointer: true },
    }
  );

  return { bind, spring };
}*/

/**  function Mover() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ offset: [x, y] }) => api.start({ x, y }), {
target:Block,
 
    bounds: { left: -100, right: 100, top: -50, bottom: 50 },
  });
  return <a.div {...bind()} style={{ x, y }} />;
}*/

/**  useFrame((state) => {
    boxref.current.position.x = boxref.current.position.x +1;
    boxref.current.position.y = boxref.current.position.y + 1;
    //ref.current.position.z = ref.current.position.z + -1;


    //const x = state.mouse.x * state.viewport.width
    //const y = (state.mouse.y * state.viewport.height) / 1.9 + -x / 3.5
    //api.position.set(x / 1.4, y, 0)


      onPointerUp={(e) => {
        //e.stopPropagation();
        api.position.set(
          boxref.current.position.x,
          boxref.current.position.y,
          //ref.current.position.z
        );
      }}
  });*/
//console.log(Mousey.current.position)
const cursor = createRef();

function useDragConstraint(child) {
  const [, , api] = usePointToPointConstraint(cursor, child );
  useEffect(() => void api.disable(), [api]);
  const onPointerUp = useCallback(
    (e) => {
      const body = document.getElementById("MouseEscape");
      body.style.cursor = "grab";
      e.target.releasePointerCapture(e.pointerId);

      api.disable();
    },
    [api]
  );
  const onPointerDown = useCallback(
    (e) => {
      const body = document.getElementById("MouseEscape");
      body.style.cursor = "grabbing";
      e.stopPropagation();
      e.target.setPointerCapture(e.pointerId);
      

      api.enable();
    },
    [api]
  );
  return { onPointerUp, onPointerDown };
}

function Cursor() {
  const [, api] = useBox(
    () => ({
      collisionFilterMask: 0,
      type: "Dynamic",
      mass: 2,
      args: [10, 2, 1],
     
     
    }),
    cursor
  );
  return useFrame((state,delta) => {
    const x = state.mouse.x * state.viewport.width;
    
   
    const z = (state.mouse.y * state.viewport.distance ) ;
    
    api.position.set(x / 2.4, 1, z/1.1);
   
  })
}

export { useDragConstraint, cursor, Cursor };

