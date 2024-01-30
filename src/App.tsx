import './App.css';
import {OrbitControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import React, {Suspense} from 'react';

import Loading from './components/loading';
import ModelViewer from './components/modelViewer';
import {AssetType} from './components/modelViewer/constants';
import {LoaderProvider} from './services/useLoading';

export default function App(): React.JSX.Element | null {
  const searchParams = new URLSearchParams(document.location.search);

  const dataUrl = searchParams.get('dataUrl');
  const assetType = searchParams.get('assetType');

  if (dataUrl === null || assetType === null) {
    return null; // todo
  }

  return (
    <LoaderProvider>
      <Canvas
        style={{height: '100vh'}}
        shadows={assetType === AssetType.OBJ}
        gl={{alpha: true, antialias: true, preserveDrawingBuffer: true}}>
        <Suspense fallback={<Loading />}>
          <ModelViewer dataUrl={dataUrl} assetType={assetType as AssetType} />
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </LoaderProvider>
  );
}
