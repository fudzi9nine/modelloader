import "./App.css";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Shadow, Center, Resize, PerspectiveCamera, CameraControls, Plane } from "@react-three/drei";
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

  const url = searchParams.get('dataUrl')
  console.log('here: ', url)
  const obj = useLoader(OBJLoader, 'https://tabeebprod.blob.core.windows.net/assets/SX-zdhk-ypy8eANSGJUq2_teapot.obj?skoid=41953f27-736e-4824-aa75-c298dd636fe7&sktid=78640a62-55b2-4751-97e3-f421dfe38721&skt=2024-01-21T13%3A55%3A03Z&ske=2024-01-28T13%3A55%3A03Z&sks=b&skv=2021-06-08&sv=2021-06-08&st=2024-01-22T08%3A08%3A33Z&se=2024-01-22T13%3A12%3A33Z&sr=b&sp=r&sig=kMhtFSAIDgE4zZAsiVj6%2Fy27913Sx7RV5bmIYillqc8%3D')

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
