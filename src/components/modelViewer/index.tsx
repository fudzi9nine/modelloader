import React from 'react';

import {AssetType} from './constants';
import {ObjViewer, PlyViewer, PotreeViewer} from './viewers';

interface Props {
  dataUrl: string;
  assetType: AssetType;
}

function ModelViewer({dataUrl, assetType}: Props): React.JSX.Element | null {
  switch (assetType) {
    case AssetType.OBJ:
      return <ObjViewer dataUrl={dataUrl} />;
    case AssetType.PLY:
      return <PlyViewer dataUrl={dataUrl} />;
    case AssetType.POTREE:
      return <PotreeViewer dataUrl={dataUrl} />;
    default:
      return null;
  }
}

export default ModelViewer;
