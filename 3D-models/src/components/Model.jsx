import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, useFBX } from '@react-three/drei'

export function Avatar(props) {
  const group = useRef()
  const { nodes, materials} = useGLTF('models/model.glb')
  const {animations : punching} = useFBX("animations/Punching.fbx")

  punching[0].name = "Punching";
  const { actions } = useAnimations(punching, group)

  useEffect(() => {
    actions.Punching.play()
  }
  , [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh name="avaturn_body"
            geometry={nodes.avaturn_body.geometry}
            material={materials.avaturn_body_material}
            skeleton={nodes.avaturn_body.skeleton} />
          <skinnedMesh name="avaturn_glasses_0"
            geometry={nodes.avaturn_glasses_0.geometry}
            material={materials.avaturn_glasses_0_material}
            skeleton={nodes.avaturn_glasses_0.skeleton} />
          <skinnedMesh name="avaturn_glasses_1"
            geometry={nodes.avaturn_glasses_1.geometry}
            material={materials.avaturn_glasses_1_material}
            skeleton={nodes.avaturn_glasses_1.skeleton} />
          <skinnedMesh name="avaturn_hair_0"
            geometry={nodes.avaturn_hair_0.geometry}
            material={materials.avaturn_hair_0_material}
            skeleton={nodes.avaturn_hair_0.skeleton} />
          <skinnedMesh name="avaturn_shoes_0"
            geometry={nodes.avaturn_shoes_0.geometry}
            material={materials.avaturn_shoes_0_material}
            skeleton={nodes.avaturn_shoes_0.skeleton} />
          <skinnedMesh name="avaturn_look_0"
            geometry={nodes.avaturn_look_0.geometry}
            material={materials.avaturn_look_0_material}
            skeleton={nodes.avaturn_look_0.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/model.glb')
