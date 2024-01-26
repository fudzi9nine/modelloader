import { memo, useMemo } from 'react'
import _ from 'lodash'
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { Box3, Euler, Vector3 } from 'three'
import { useFrame, useLoader, useThree, Canvas } from '@react-three/fiber'
import useCacheCleanup from './services/useCacheCleanup'
import PotreeLoader from './services/potreeLoader'
const THROTTLE_INTERVAL_MS = 15



function PotreeViewer ({dataUrl}){
  const pointCloud = useLoader(
    PotreeLoader,
    dataUrl
  )

  console.log(pointCloud)
  useCacheCleanup(PotreeLoader, dataUrl)

  pointCloud.material.vertexColors = true
  pointCloud.material.size = 0.000001

  // const box = useMemo(() => {
  //   const min = pointCloud
  //     .localToWorld(pointCloud.pcoGeometry.tightBoundingBox.min.clone())
  //     .applyEuler(new Euler(-Math.PI / 2, 0, 0),)

  //   const max = pointCloud
  //     .localToWorld(pointCloud.pcoGeometry.tightBoundingBox.max.clone())
  //     .applyEuler(new Euler(-Math.PI / 2, 0, 0),)

  //   return new Box3().setFromPoints([min, max])
  // }, [pointCloud])

  const camera = useThree((state) => state.camera)
  const renderer = useThree((state) => state.gl)



  const update = useMemo(() => {
    return _.throttle(() => {
      pointCloud.potree.updatePointClouds([pointCloud], camera, renderer)
    }, THROTTLE_INTERVAL_MS)
  }, [camera, pointCloud, renderer])

  useFrame(update)


  return (
    <Canvas 
        style={{backgroundColor: '#fff',}} 
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        raycaster={{ params: { Points: { threshold: 0.01 } } }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight  args={[0xffffff, 1]} position={[0,0,-1]}/>
        <directionalLight  args={[0xffffff, 0.2]} position={[0,0,1]}/>
        <hemisphereLight args={[0xffffff, 0x000000]}  />
        <primitive object={pointCloud} />
        <PerspectiveCamera makeDefault args={[40, null, 0.01, 100000]} position={new Vector3(0, 0, 1000)} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default memo(PotreeViewer)
