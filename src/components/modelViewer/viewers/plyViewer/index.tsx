import { useLoader } from "@react-three/fiber";
import { Resize, Center, Stage } from "@react-three/drei";
import { PLYLoader } from 'three-stdlib'
import { Points, PointsMaterial } from 'three'
import { useLoading } from "../../../../services/useLoading";

type Props = {
  dataUrl: string;
}

function PlyViewer({dataUrl}: Props){
  const {setProgress} = useLoading()

  const ply = useLoader(PLYLoader, dataUrl, undefined, setProgress)
  
  const points = new Points(ply, new PointsMaterial({ size: 0.001 }))

  return (
      <Stage shadows={false} >
        <Resize>
          <Center >
            <primitive object={points}  />
          </ Center >
        </Resize>
      </Stage>
  )
}

export default PlyViewer;
