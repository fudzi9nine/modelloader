import "./App.css";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, CameraControls, Resize, Center, Html, useProgress } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { Suspense, useEffect, useState } from "react";
import { Points, PointsMaterial, Vector3 } from 'three'

import Loader from "./loader";
import ObjViewer from './modelViewer/viewers/objViewer'
import PlyViewer from './modelViewer/viewers/plyViewer'
import PotreeViewer from "./modelViewer/viewers/potreeViewer";
import ModelViewer from "./modelViewer";
import { AssetType } from "./modelViewer/constants";

const OBJ_SEARCH_QUERY = '.obj?'
const PlY_SEARCH_QUERY = '.ply?'

const meshMaterial = new THREE.MeshPhongMaterial({
  color: '#e5e5e5',
  // opacity: .5,
  // transparent: !0,
  // depthTest: !1,
  // depthWrite: !1,
  // flatShading: true,
  side: THREE.DoubleSide,
})

const lineMaterial = new THREE.LineBasicMaterial({
  color: '#e5e5e5',
})

const plyMaterial = new THREE.PointsMaterial({
  color: '#e5e5e5',
  size: 10
})

function Model(){
  const searchParams = new URLSearchParams(document.location.search)

  const dataUrl = searchParams.get('dataUrl')


  if(dataUrl.includes(OBJ_SEARCH_QUERY)){
    return <AssetObj dataUrl={dataUrl} />
  } else if (dataUrl.includes(PlY_SEARCH_QUERY)){
    return <AssetPly dataUrl={dataUrl} />
  }
}

// function Testy(){

//   return (
//     <Canvas className="canvas">
//       <Suspense fallback={null}>
//         <ambientLight args={['#ffffff', 1]} />
//       </Suspense>
//     </Canvas>
//   )
// }

function AssetPly({dataUrl}){
  console.log('before ply')

  const ply = useLoader(PLYLoader, '')
  
  console.log(ply)
  console.log('after ply')
  const points = new Points(ply, new PointsMaterial({ size: 0.0001 }))
  return <primitive object={points}  />
  // return <mesh geometry={ply} material={meshMaterial} />

}


function AssetObj({dataUrl}){


  console.log('before obj')

  const obj = useLoader(OBJLoader, '')

  console.log(obj)
  console.log('after obj')

  useEffect(() => {
    if(obj){
    console.log('added material')
    obj.traverse((child) => {
      if(child instanceof THREE.LineSegments) {
        child.material = lineMaterial;
      } else if (child instanceof THREE.Mesh) {
        child.material = meshMaterial;
      }

    });
    }
  })

  
  return <primitive object={obj} />
};

export default function App() {
  
  const searchParams = new URLSearchParams(document.location.search)

  const dataUrl = searchParams.get('dataUrl')
  const assetType = searchParams.get('assetType')

  const [progress, setProgress] = useState(0)

  const calculateProgress = (loaded, total) => {
    setProgress(((loaded / total) * 100).toFixed(2))
  }

  return (
    <>
    <Canvas 
      style={{height: '100vh'}} 
      shadows={assetType === AssetType.OBJ}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      raycaster={{ params: { Points: { threshold: 0.01 } } }}>
      <Suspense fallback={<Loader progress={progress}/>}>
        <ModelViewer dataUrl={dataUrl} assetType={assetType} calculateProgress={calculateProgress} />
        <OrbitControls makeDefault />
      </Suspense>
    </Canvas>
    </>
    // <PlyViewer />
    // <ObjViewer />
    // <div className="App">
    //   <Canvas 
    //     style={{backgroundColor: '#fff'}} 
    //     gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
    //     raycaster={{ params: { Points: { threshold: 0.01 } } }}>
    //     <Suspense fallback={null}>
    //       <ambientLight intensity={0.2} />
    //       <directionalLight  args={[0xffffff, 1]} position={[0,0,-1]}/>
    //       <directionalLight  args={[0xffffff, 0.2]} position={[0,0,1]}/>
    //       <hemisphereLight args={[0xffffff, 0x000000]}  />
    //       {/* <Resize> */}
    //       {/* <Center center> */}
    //         <PotreeViewer url=""/>
    //         {/* <AssetPly /> */}
    //         {/* <Plane
    //           receiveShadow // highlight-line
    //           rotation={[-Math.PI / 2, 0, 0]}
    //           position={[0, -50, 0]}
    //           args={[1000, 1000]}
    //         >
    //           <meshStandardMaterial attach="material" color="white" />
    //         </Plane> */}
    //       {/* </Center> */}
    //       {/* </Resize> */}
    //       <PerspectiveCamera makeDefault args={[40, null, 0.01, 100000]} position={new Vector3(0, 0, 1000)} />
    //       {/* <CameraControls dollyToCursor makeDefault enableRotate enableDamping enablePan enableZoom />  */}
    //       <OrbitControls />
    //     </Suspense>
    //   </Canvas>
    // </div>
  );
}
