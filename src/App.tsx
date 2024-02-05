import './App.css';
import {OrbitControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import React, {Suspense} from 'react';

import {ErrorBoundary, ErrorMessage} from './components/errorHandler';
import Loading from './components/loading';
import ModelViewer from './components/modelViewer';
import {LoaderProvider} from './services/useLoading';

export default function App(): React.ReactNode {
  const searchParams = new URLSearchParams(document.location.search);

  const dataUrl = searchParams.get('dataUrl');

  if (dataUrl === null) {
    return <ErrorMessage />;
  }

  return (
    <LoaderProvider>
      <ErrorBoundary>
        <Canvas
          style={{height: '100vh'}}
          shadows={true}
          gl={{
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: true
          }}>
          <Suspense fallback={<Loading />}>
            <ModelViewer dataUrl={dataUrl} />
            <OrbitControls makeDefault />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </LoaderProvider>
  );
}
