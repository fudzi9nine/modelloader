import {Html} from '@react-three/drei';
import React from 'react';

import {ErrorMessage} from '../errorHandler';

import {AssetType, UNSUPPORTET_FORMAT_MESSAGE} from './constants';
import {ObjViewer, PlyViewer, PotreeViewer} from './viewers';

interface Props {
  dataUrl: string;
}

function ModelViewer({dataUrl}: Props): React.ReactNode {
  const {pathname} = new URL(dataUrl);

  const ext = pathname.split('.').pop();

  switch (ext?.toLowerCase()) {
    case AssetType.OBJ:
      return <ObjViewer dataUrl={dataUrl} />;
    case AssetType.PLY:
      return <PlyViewer dataUrl={dataUrl} />;
    case AssetType.POTREE:
      return <PotreeViewer dataUrl={dataUrl} />;
    default:
      return (
        <Html fullscreen>
          <ErrorMessage message={UNSUPPORTET_FORMAT_MESSAGE} />
        </Html>
      );
  }
}

export default ModelViewer;
