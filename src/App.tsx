import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";
import { Suspense } from "react";

import { LoaderProvider } from "./services/useLoading";

import Loading from "./components/loading";

import ModelViewer from "./components/modelViewer";
import { AssetType } from "./components/modelViewer/constants";

export default function App() {
  
  const searchParams = new URLSearchParams(document.location.search)

  const dataUrl = searchParams.get('dataUrl')
  const assetType = searchParams.get('assetType')


  if(!dataUrl || !assetType) {
    return null //todo
  }

  return (
    <LoaderProvider>
      <Canvas 
        style={{height: '100vh'}} 
        shadows={assetType === AssetType.OBJ}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        >
        <Suspense fallback={<Loading />}>
          <ModelViewer dataUrl={dataUrl} assetType={(assetType as AssetType)} />
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </LoaderProvider>
  );
}
