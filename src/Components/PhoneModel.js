import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, Html, useTexture, Torus } from '@react-three/drei'
import { a, useSpring, animated, config } from '@react-spring/three'

export default function Model(props) {

  //GLTF LOADER______________________________________________________________________________________
  const { nodes } = useGLTF('/phonecase.gltf')

  //FLIP ANIMATION______________________________________________________________________________________
  function FlippingPhone() {
    const myMesh = React.useRef();
    const [flip, setFlip] = useState(false);

    const { rotation, position } = useSpring({
      rotation: flip ? [0, Math.PI * 2.1, 0] : [0, 0, 0],
      position: flip ? [-5,-1,3] : [0,0,0],
      config: config.slow
    });

    //HTML MARKERS______________________________________________________________________________________
    const [hidden, setMarker] = useState(false)

    function Marker({ children, ...props }) {
      return (
        <Html
          center
          zIndexRange={[0]}
          style={{transition: 'all 0.2s', opacity: hidden ? 0.2 : 1,}}
          {...props}
        >
          {children}
        </Html>
      )
    }

    //TEXTURAS______________________________________________________________________________________
    const [home, gamification, ranking, quizz, store] = useTexture(['/default.png', '/gamification.png', '/ranking.png', '/quizz.png', '/store.png'])
    const [activeTexture, SetActiveTexture] = useState(home)
    home.flipY = gamification.flipY = ranking.flipY = quizz.flipY = store.flipY = false;

    function ChangeTexture() {
      setFlip(!flip)
      setMarker(!hidden)
      console.log(hidden)
    }

    return (
      <animated.group ref={myMesh} rotation={rotation} position={position}>
        <animated.mesh geometry={nodes.casephone.geometry}>
          <meshStandardMaterial attach='material' color='#111115' roughness={0.45} metalness={1} opacity={0.7} envMapIntensity={1} needsUpdate={true}/>
          <mesh geometry={nodes.tela.geometry}>
            <meshStandardMaterial attach='material' map={activeTexture} roughness={0.2} metalness={0.1} envMapIntensity={0.8} needsUpdate={true}/>
          </mesh>
          <mesh geometry={nodes.detail.geometry}>
            <meshStandardMaterial attach='material' color='#111115'/>
          </mesh>
          <Marker position={[-3, 1.1, 0.2]}>
            <button className="pin-style" onClick={() => ChangeTexture(SetActiveTexture(gamification))}>
              Gamificação
            </button>
          </Marker>
          <Marker position={[2.2, 0, 0.2]} >
            <button className="pin-style" onClick={() => ChangeTexture(SetActiveTexture(home))}>
              Ranking
            </button>
          </Marker>
          <Marker position={[-0.5, -4.4, 0.2]}>
            <button className="pin-style" onClick={() => ChangeTexture(SetActiveTexture(quizz))}>
              Quizz
            </button>
          </Marker>
          <Marker position={[2.4, -4, 0.2]}>
            <button className="pin-style" onClick={() => ChangeTexture(SetActiveTexture(store))}>
              Loja
            </button>
          </Marker>
          {/* <Torus args={[4, 0.03, 60, 60]} rotation={[Math.PI*1.5, 0, 0]} position={[0,0,0]}/> */}
        </animated.mesh>
      </animated.group>
    );
  }

  return (
      <FlippingPhone/> 
  )
}

useGLTF.preload('/phonecase.gltf')