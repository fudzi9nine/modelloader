import "./App.css";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, CameraControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Suspense, useEffect } from "react";
import { Mesh, Vector3 } from "three";

const material = new THREE.MeshPhongMaterial({
  color: '#e5e5e5',
  opacity: .5,
  transparent: !0,
  depthTest: !1,
  depthWrite: !1,
  side: THREE.DoubleSide,
})

const Scene = () => {
  const searchParams = new URLSearchParams(document.location.search)

  const dataUrl = searchParams.get('dataUrl')
  const obj = useLoader(OBJLoader, dataUrl)

  useEffect(() => {
    if(obj){
    console.log('added material')
    obj.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    }
  })

  
  return <primitive object={obj} />
};

export default function App() {
  
  return (
    <div className="App">
      <Canvas >
        <Suspense fallback={null}>
          <ambientLight />
          {/* <hemisphereLight args={[0xffffff, 0x000000]} />  */}
          {/* <Resize height> */}
          {/* <Center center> */}
            <Scene />
            {/* <Plane
              receiveShadow // highlight-line
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -50, 0]}
              args={[1000, 1000]}
            >
              <meshStandardMaterial attach="material" color="white" />
            </Plane> */}
          {/* </Center> */}
          {/* </Resize> */}
          <PerspectiveCamera makeDefault args={[40, null, 0.0001, 100000]} position={new Vector3(0, 0, 1000)} />
          <CameraControls dollyToCursor makeDefault enableRotate enableDamping enablePan enableZoom /> 
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
