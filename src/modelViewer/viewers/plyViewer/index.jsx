import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, CameraControls, Resize, Center, AccumulativeShadows, Stage, RandomizedLight } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Suspense, useEffect } from "react";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { Points, PointsMaterial } from 'three'

function PlyViewer({dataUrl}){
  const ply = useLoader(PLYLoader, dataUrl)
  console.log('ply')
  console.log(ply)
  const points = new Points(ply, new PointsMaterial({ size: 0.001 }))

  console.log('points')
  console.log(points)

  return (
    <Canvas style={{height: '100vh'}}>
    <Suspense fallback={null}>
      <Stage center={true} shadows={false} >
        <Resize>
          <Center >
            <primitive object={points}  />
          </ Center >
        </Resize>

        <OrbitControls makeDefault />
      </Stage>

    </Suspense>
  </Canvas>
  )
}

export default PlyViewer;
