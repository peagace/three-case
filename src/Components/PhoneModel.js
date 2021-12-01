import * as THREE from 'three'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useGLTF, Html, useTexture, } from '@react-three/drei'
import { a, useSpring, animated, config } from '@react-spring/three'

import BouncyControls from '../Components/Controls'

export default function Model(props) {

  //GLTF LOADER___________________________________________
  const { nodes } = useGLTF('/phonecase.gltf')

  //FLIP ANIMATION___________________________________________
  function FlippingPhone() {
    const myMesh = React.useRef();
    const [flip, setFlip] = useState(false);

    const { rotation } = useSpring({
      rotation: flip ? [0, Math.PI * 2, 0] : [0, 0, 0],
      config: config.slow
    });

    //HTML MARKERS___________________________________________
    const [hidden, setMarker] = useState()

    function Marker({ children, ...props }) {
      return (
        <Html
          transform
          occlude
          zIndexRange={[0]}
          onOcclude={setMarker}
          style={{ transition: 'all 0.2s', opacity: hidden ? 0 : 1, transform: `scale(${hidden ? 0.25 : 1})` }}
          {...props}
        >
          {children}
        </Html>
      )
    }

    //TEXTURAS___________________________________________
    const [home, gamification, ranking, quizz, store] = useTexture(['/default.png', '/gamification.png', '/ranking.png', '/quizz.png', '/store.png'])
    const [activeTexture, SetActiveTexture] = useState(home)
    home.flipY = false;
    gamification.flipY = false;
    ranking.flipY = false;
    quizz.flipY = false;
    store.flipY = false;

    function SetDefault() {
      SetActiveTexture(home)
      setFlip(!flip)
      setMarker(true)
    }

    function SetGamification() {
      SetActiveTexture(gamification)
      setFlip(!flip)
      setMarker(false)
    }

    function SetRanking() {
      SetActiveTexture(ranking)
      setFlip(!flip)
    }

    function SetQuizz() {
      SetActiveTexture(quizz)
      setFlip(!flip)
    }

    function SetStore() {
      SetActiveTexture(store)
      setFlip(!flip)
    }

    return (
      <animated.group ref={myMesh} rotation={rotation}>
        <animated.mesh geometry={nodes.casephone.geometry}>
          <meshStandardMaterial attach='material' color='#111115' roughness={0.45} metalness={1} opacity={0.7} envMapIntensity={1} />
          <mesh geometry={nodes.tela.geometry}>
            <meshStandardMaterial attach='material' map={activeTexture} roughness={0.2} metalness={0.1} envMapIntensity={0.8} />
          </mesh>
          <mesh geometry={nodes.detail.geometry}>
            <meshStandardMaterial attach='material' color='#111115' />
          </mesh>
          <Marker position={[-3, 1, 0.4]}>
            <button className="pin-style" onClick={() => SetGamification()}>
              Gamificação
            </button>
          </Marker>
          <Marker position={[2.5, 0, 0.4]} >
            <button className="pin-style" onClick={() => SetRanking()}>
              Ranking
            </button>
          </Marker>
          <Marker position={[-0.5, -4.3, 0.4]}>
            <button className="pin-style" onClick={() => SetQuizz()}>
              Quizz
            </button>
          </Marker>
          <Marker position={[2, -4.2, 0.4]}>
            <button className="pin-style" onClick={() => SetStore()}>
              Loja
            </button>
          </Marker>
        </animated.mesh>
      </animated.group>
    );
  }

  return (
    <group  {...props} dispose={null} scale={1} position={[0, 0, 0]}>
      <BouncyControls>
        <FlippingPhone />
      </BouncyControls>
    </group>
  )
}

useGLTF.preload('/phonecase.gltf')