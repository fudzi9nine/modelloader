import { memo, useMemo } from 'react'
import _ from 'lodash'

import { Box3, Vector3 } from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import useCacheCleanup from './services/useCacheCleanup'
import PotreeLoader from './services/potreeLoader'

const THROTTLE_INTERVAL_MS = 15

function PotreeViewer ({dataUrl}){

  const pointCloud = useLoader(
    PotreeLoader,
    dataUrl
  )

  useCacheCleanup(PotreeLoader, dataUrl)

  pointCloud.material.vertexColors = true
  pointCloud.material.size = 0.000001

  const [camera, renderer, controls] = useThree((state) => [state.camera, state.gl, state.controls])

  const min = pointCloud
    .localToWorld(pointCloud.pcoGeometry.tightBoundingBox.min.clone())

  const max = pointCloud
    .localToWorld(pointCloud.pcoGeometry.tightBoundingBox.max.clone())

  const box =  new Box3().setFromPoints([min, max])
  const center = box.getCenter( new Vector3() );

  controls?.target?.set(center.x, center.y, center.z)

  var radius = pointCloud.boundingSphere.radius;
  var fov = camera.fov;

  camera.position.set( center.x, center.y, center.z + 1.1*radius/Math.tan(fov*Math.PI/360) );

  const update = useMemo(() => {
    return _.throttle(() => {
      pointCloud.potree.updatePointClouds([pointCloud], camera, renderer)
    }, THROTTLE_INTERVAL_MS)
  }, [camera,  pointCloud, renderer])

  useFrame(update)

  return <primitive object={pointCloud} />
}

export default memo(PotreeViewer)
