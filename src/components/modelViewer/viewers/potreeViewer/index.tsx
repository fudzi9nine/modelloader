import { memo, useMemo } from 'react'
import _ from 'lodash'

import { Box3, PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls} from 'three-stdlib';

import { useFrame, useLoader, useThree } from '@react-three/fiber'
import useCacheCleanup from './services/useCacheCleanup'
import PotreeLoader from './services/potreeLoader'
import { PointCloudOctree } from 'potree-core'

type Props = {
  dataUrl: string;
}

const THROTTLE_INTERVAL_MS = 15

function PotreeViewer ({dataUrl}: Props){

  const pointCloud: PointCloudOctree = useLoader(
    PotreeLoader,
    dataUrl
  )

  useCacheCleanup(PotreeLoader, dataUrl)

  pointCloud.material.vertexColors = true
  pointCloud.material.size = 0.000001

  const {camera, gl, controls} = useThree()

  const min = pointCloud
    .localToWorld(pointCloud.pcoGeometry.tightBoundingBox.min.clone())

  const max = pointCloud
    .localToWorld(pointCloud.pcoGeometry.tightBoundingBox.max.clone())

  const box =  new Box3().setFromPoints([min, max])
  const center = box.getCenter( new Vector3() );

  (controls as OrbitControls)?.target?.set(center.x, center.y, center.z)
  console.log('controls: ', controls)

  const radius = pointCloud.boundingSphere.radius;
  const fov = (camera as PerspectiveCamera).fov;

  camera.position.set( center.x, center.y, center.z + 1.1*radius/Math.tan(fov*Math.PI/360) );

  const update = useMemo(() => {
    return _.throttle(() => {
      pointCloud.potree.updatePointClouds([pointCloud], camera, gl)
    }, THROTTLE_INTERVAL_MS)
  }, [camera,  pointCloud, gl])

  useFrame(update)

  return <primitive object={pointCloud} />
}

export default memo(PotreeViewer)
