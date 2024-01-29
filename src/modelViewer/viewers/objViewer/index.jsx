
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import {  Resize, Center, Stage } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoading } from "../../../services/useLoading";

// const meshMaterial = new THREE.MeshPhongMaterial({
//   // opacity: .5,
//   // transparent: !0,
//   // depthTest: !1,
//   // depthWrite: !1,
//   // flatShading: true,
//   color: '#eee',
//   side: THREE.DoubleSide,
// })


function ObjViewer({dataUrl}){
  console.log('before load')

  const {setProgress} = useLoading()

  const obj = useLoader(OBJLoader, dataUrl, null, setProgress)

  console.log(obj)
    if(obj){
    console.log('added material')
    let meshToAdd = [];
    obj.traverse((child) => {
      if(child){
        child.castShadow = true;
        child.receiveShadow = true;
        if(child.material?.[0]){
          child.material.forEach((_, id) => {
            child.material[id].side = THREE.DoubleSide
            // child.material[id].aoMap = new THREE.Texture(null,null, null, null, null ,null, null, null,null, THREE.LinearSRGBColorSpace)
          })
        } else if(child.material){
          // child.material.aoMap = new THREE.Texture(null,null, null, null, null ,null, null, null,null, THREE.LinearSRGBColorSpace)
          child.material.side = THREE.DoubleSide;

          // child.material.specularMap = new THREE.Texture(null,null, null, null, null ,null, null, null,null, THREE.LinearSRGBColorSpace)
          // if(child.material?.emissive){
          //   child.material.emissive = new THREE.Color(0, 0, 0)
          // }
          // child.material.flatShading = false
        }
      }


      // if (child instanceof THREE.LineSegments) {
      //   const newMesh = new THREE.Mesh(child.geometry, child.material)
      //   newMesh.castShadow = true;
      //   newMesh.receiveShadow = true;
      //   if(newMesh.material?.[0]){
      //     newMesh.material.forEach((_, id) => {
      //       newMesh.material[id].side = THREE.DoubleSide
      //       // newMesh.material.aoMap = new THREE.Texture(null,null, null, null, null ,null, null, null,null, THREE.SRGBColorSpace)
      //     })
      //   } else if(newMesh.material){
      //     // newMesh.material.aoMap = new THREE.Texture(null,null, null, null, null ,null, null, null,null, THREE.SRGBColorSpace)
      //     newMesh.material.side = THREE.DoubleSide;

      //   }

      //   meshToAdd.push(newMesh);
      // }


    });
    meshToAdd.forEach(mesh => {
      obj.add(mesh)
    })
    meshToAdd = []
    }
  console.log(obj)



  return (
    <Stage
      shadows={{
        frames: 100,
        type: 'accumulative',
        temporal: false,
        alphaTest: 0.3,
      }}
      center={true}
    >
      <Resize>
        <Center >
            <primitive object={obj} />
        </ Center >
      </Resize>
      {/* <hemisphereLight args={['#fff', '#000']} position={[1, 1, 1]}/> */}
      {/* <ambientLight args={['#fff', 0.5]} /> */}
      {/* <directionalLight args={['#fff', 1]} position={[0, 1, 0]} castShadow/> */}
      {/* <color attach='background' args={[new THREE.Color(255, 255, 255)]} /> */}
    </Stage>
  )
}

export default ObjViewer
