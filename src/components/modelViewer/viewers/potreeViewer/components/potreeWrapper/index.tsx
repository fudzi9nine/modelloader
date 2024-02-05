import {useThree} from '@react-three/fiber';
import React, {useCallback, useEffect, useState} from 'react';
import {Box3, type PerspectiveCamera, Vector3} from 'three';
import {type OrbitControls} from 'three-stdlib';

import {sendMessageToRN, useMobileMessageHandler} from '../../../../../../services/messageHandler';
import {potreeAssetsMapper} from '../../mappers';
import PotreeModel from '../potreeModel';

interface Props {
  dataUrl: string;
}

function PotreeWrapper({dataUrl}: Props): React.ReactNode {
  const [assets, setAssets] = useState<string[]>([]);
  const [vectors, setVectors] = useState<Vector3[]>([]);

  const onGetAssetList = useCallback(
    ({assetList}: {assetList: string[]}) => {
      setAssets(potreeAssetsMapper(assetList, dataUrl));
    },
    [dataUrl]
  );

  useMobileMessageHandler('additionalAssets', onGetAssetList);

  useEffect(() => {
    sendMessageToRN('typeIdentified', {isIdentified: true});
  }, []);

  const addVectors = useCallback((newVectors: Vector3[]) => {
    setVectors(state => [...state, ...newVectors]);
  }, []);

  const {camera, controls} = useThree();

  useEffect(() => {
    if (assets.length > 0 && assets.length === vectors.length / 2) {
      const box = new Box3().setFromPoints(vectors);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const radius = Math.max(size.x, size.y, size.z) / 2;

      (controls as OrbitControls)?.target?.set(center.x, center.y, center.z);

      const fov = (camera as PerspectiveCamera).fov;

      camera.position.set(center.x, center.y, center.z + (1.1 * radius) / Math.tan((fov * Math.PI) / 360));
    }
  }, [assets.length, camera, controls, vectors]);

  if (assets.length === 0) {
    return null;
  }

  return assets.map(asset => <PotreeModel key={asset} addVectors={addVectors} dataUrl={asset} />);
}

export default PotreeWrapper;
