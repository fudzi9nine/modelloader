import { useLoader } from "@react-three/fiber";
import { Resize, Center, Stage } from "@react-three/drei";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { Points, PointsMaterial } from 'three'

function PlyViewer({dataUrl}){
  const ply = useLoader(PLYLoader, dataUrl)
  const points = new Points(ply, new PointsMaterial({ size: 0.001 }))


  return (
      <Stage center={true} shadows={false} >
        <Resize>
          <Center >
            <primitive object={points}  />
          </ Center >
        </Resize>
      </Stage>
  )
}

export default PlyViewer;
