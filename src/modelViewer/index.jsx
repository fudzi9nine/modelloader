import {AssetType} from './constants'
import { ObjViewer, PlyViewer, PotreeViewer } from './viewers'

function ModelViewer({dataUrl, assetType}){
  console.log('Inside Model Viewer')
  switch(assetType){
    case (AssetType.OBJ):
      return <ObjViewer dataUrl={dataUrl}/>
    case (AssetType.PLY):
      return <PlyViewer dataUrl={dataUrl}/>
    case (AssetType.POTREE):
      return <PotreeViewer dataUrl={dataUrl}/>
    default:
      return null;
  }
}

export default ModelViewer;