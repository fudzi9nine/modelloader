import {useFrame, useLoader, useThree} from '@react-three/fiber';
import _ from 'lodash';
import {type PointCloudOctree} from 'potree-core';
import React, {memo, useMemo} from 'react';
import {Box3, type PerspectiveCamera, Vector3} from 'three';
import {type OrbitControls} from 'three-stdlib';

import PotreeLoader from '../../services/potreeLoader';
import useCacheCleanup from '../../services/useCacheCleanup';

interface Props {
  dataUrl: string;
}

const THROTTLE_INTERVAL_MS = 15;

function PotreeModel({dataUrl}: Props): React.ReactNode {
  const pointCloud: PointCloudOctree = useLoader(PotreeLoader, dataUrl);

  useCacheCleanup(PotreeLoader, dataUrl);

  pointCloud.material.vertexColors = true;
  pointCloud.material.size = 0.000001;

  const {camera, gl, controls} = useThree();

  const min = pointCloud.localToWorld(pointCloud.pcoGeometry.tightBoundingBox.min.clone());

  const max = pointCloud.localToWorld(pointCloud.pcoGeometry.tightBoundingBox.max.clone());

  const box = new Box3().setFromPoints([min, max]);
  const center = box.getCenter(new Vector3());

  (controls as OrbitControls)?.target?.set(center.x, center.y, center.z);

  const radius = pointCloud.boundingSphere.radius;
  const fov = (camera as PerspectiveCamera).fov;

  camera.position.set(center.x, center.y, center.z + (1.1 * radius) / Math.tan((fov * Math.PI) / 360));

  const update = useMemo(() => {
    return _.throttle(() => {
      pointCloud.potree.updatePointClouds([pointCloud], camera, gl);
    }, THROTTLE_INTERVAL_MS);
  }, [camera, pointCloud, gl]);

  useFrame(update);

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={pointCloud} />;
}

export default memo(PotreeModel);
