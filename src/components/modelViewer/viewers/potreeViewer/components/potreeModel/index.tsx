import {useFrame, useLoader, useThree} from '@react-three/fiber';
import _ from 'lodash';
import {type PointCloudOctree} from 'potree-core';
import React, {memo, useEffect, useMemo} from 'react';
import {type Vector3} from 'three';

import PotreeLoader from '../../services/potreeLoader';
import useCacheCleanup from '../../services/useCacheCleanup';

interface Props {
  dataUrl: string;
  addVectors: (newVectors: Vector3[]) => void;
}

const THROTTLE_INTERVAL_MS = 15;

function PotreeModel({dataUrl, addVectors}: Props): React.ReactNode {
  const pointCloud: PointCloudOctree = useLoader(PotreeLoader, dataUrl);

  useCacheCleanup(PotreeLoader, dataUrl);

  pointCloud.material.vertexColors = true;
  pointCloud.material.size = 0.000001;

  const {camera, gl} = useThree();

  useEffect(() => {
    const min = pointCloud.localToWorld(pointCloud.pcoGeometry.tightBoundingBox.min.clone());
    const max = pointCloud.localToWorld(pointCloud.pcoGeometry.tightBoundingBox.max.clone());
    addVectors([min, max]);
  }, [addVectors, pointCloud]);

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
