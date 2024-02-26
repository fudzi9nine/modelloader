import './App.css';
import {OrbitControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import React, {Suspense, useCallback, useEffect, useState} from 'react';

import {ErrorBoundary} from './components/errorHandler';
import Loading from './components/loading';
import ModelViewer from './components/modelViewer';
import {sendMessageToRN, useMobileMessageHandler} from './services/messageHandler';
import {LoaderProvider} from './services/useLoading';

export default function App(): React.ReactNode {
  const [dataUrl, setDataUrl] = useState<string>('');

  const onGetDataUrl = useCallback((url: string) => {
    setDataUrl(url);
  }, []);

  useMobileMessageHandler('dataUrl', onGetDataUrl);

  useEffect(() => {
    sendMessageToRN('pageLoaded');
  }, []);

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
            {dataUrl === '' ? <Loading /> : <ModelViewer dataUrl={dataUrl} />}
            <OrbitControls makeDefault />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </LoaderProvider>
  );
}
