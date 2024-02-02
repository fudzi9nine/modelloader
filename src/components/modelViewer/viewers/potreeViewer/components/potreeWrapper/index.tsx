import React, {useCallback, useEffect, useState} from 'react';

import {sendMessageToRN, useMobileMessageHandler} from '../../../../../../services/messageHandler';
import {potreeAssetsMapper} from '../../mappers';
import PotreeModel from '../potreeModel';

interface Props {
  dataUrl: string;
}

function PotreeWrapper({dataUrl}: Props): React.ReactNode {
  const [assets, setAssets] = useState<string[]>([]);

  const onGetAssetList = useCallback(({assetList}: {assetList: string[]}) => {
    setAssets(potreeAssetsMapper(assetList, dataUrl));
  }, []);

  useMobileMessageHandler('additionalAssets', onGetAssetList);

  useEffect(() => {
    sendMessageToRN('typeIdentified', {isIdentified: true});
  }, []);

  if (assets.length === 0) {
    return null;
  }

  return assets.map(asset => <PotreeModel key={asset} dataUrl={asset} />);
}

export default PotreeWrapper;
