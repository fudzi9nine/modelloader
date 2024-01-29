import {  Html } from "@react-three/drei";

function Loader({progress}){

  return (
    <Html center>
      <div style={{backgroundColor: '#000', display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
        <span className="loader" />
        <span style={{color: '#fff', marginTop: 10, width: 125}}>{`Loading ${progress}%`}</span>
      </div>
    </Html>
  )
}

export default Loader;