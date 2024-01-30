import {Resize, Center, Stage} from '@react-three/drei';
import {useLoader} from '@react-three/fiber';
import React from 'react';
import {Points, PointsMaterial} from 'three';
import {PLYLoader} from 'three-stdlib';

import {useLoading} from '../../../../services/useLoading';

interface Props {
  dataUrl: string;
}

function PlyViewer({dataUrl}: Props): React.JSX.Element {
  const {setProgress} = useLoading();

  const ply = useLoader(PLYLoader, dataUrl, undefined, setProgress);

  const points = new Points(ply, new PointsMaterial({size: 0.001}));

  return (
    <Stage shadows={false}>
      <Resize>
        <Center>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <primitive object={points} />
        </Center>
      </Resize>
    </Stage>
  );
}

export default PlyViewer;
