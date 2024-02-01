import {Resize, Center, Stage} from '@react-three/drei';
import {useLoader} from '@react-three/fiber';
import {isArray} from 'lodash';
import React from 'react';
import * as THREE from 'three';
import {OBJLoader} from 'three-stdlib';

import {useLoading} from '../../../../services/useLoading';

// const meshMaterial = new THREE.MeshPhongMaterial({
//   // opacity: .5,
//   // transparent: !0,
//   // depthTest: !1,
//   // depthWrite: !1,
//   // flatShading: true,
//   color: '#eee',
//   side: THREE.DoubleSide,
// })

interface Props {
  dataUrl: string;
}

function ObjViewer({dataUrl}: Props): React.ReactNode {
  const {setProgress} = useLoading();

  const obj = useLoader(OBJLoader, dataUrl, undefined, setProgress);

  obj.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (isArray(child.material)) {
        child.material.forEach((_, id) => {
          child.material[id].side = THREE.DoubleSide;
        });
      } else if (child.material instanceof THREE.Material) {
        child.material.side = THREE.DoubleSide;
      }
    }
  });

  return (
    <Stage
      shadows={{
        frames: 100,
        type: 'accumulative',
        temporal: false,
        alphaTest: 0.3
      }}>
      <Resize>
        <Center>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <primitive object={obj} />
        </Center>
      </Resize>
    </Stage>
  );
}

export default ObjViewer;
