import "./index.css";
import {  Html } from "@react-three/drei";
import { useLoading } from "../services/useLoading";

function Loading(){

  const {progress} = useLoading()

  return (
    <Html center>
      <div style={{backgroundColor: '#000', display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 130, height: 80}}>
        <span className="loader" />
        {progress && <span style={{color: '#fff', marginTop: 10, width: 130}}>{`Loading ${progress}%`}</span>}
        </div>
      </div>
    </Html>
  )
}

export default Loading;