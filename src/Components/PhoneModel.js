import * as THREE from 'three'
import React, { useState } from 'react'
import { useGLTF, Html, useTexture, Torus, Float, Stage, PresentationControls } from '@react-three/drei'
import { a, useSpring, animated, config } from '@react-spring/three'
//import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Canvas } from '@react-three/fiber'


export default function Model(props) {

  //GLTF LOADER______________________________________________________________________________________
  const { nodes } = useGLTF('/phonecase.gltf')

  //FLIP ANIMATION______________________________________________________________________________________
  function FlippingPhone() {
    const myMesh = React.useRef();
    const [flip, setFlip] = useState(false);

    const { rotation, position } = useSpring({
      rotation: flip ? [0, Math.PI * 2.1, 0] : [0, 0, 0],
      position: flip ? [-5, -1, 3] : [0, 0, 0],
      config: config.slow
    });

    //HTML MARKERS______________________________________________________________________________________
    const [hidden, setMarker] = useState(false)

    function Marker({ children, ...props }) {
      return (
        <Html
          center
          zIndexRange={[0]}
          style={{ transition: 'all 0.2s', opacity: hidden ? 0.2 : 1, }}
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
    }

    return (
      <animated.group ref={myMesh} rotation={rotation} position={position}>
        <mesh geometry={nodes.casephone.geometry}>
          <meshStandardMaterial attach='material' color='#111115' roughness={0.45} metalness={1} opacity={0.7} envMapIntensity={1} />
          <mesh geometry={nodes.tela.geometry}>
            <meshStandardMaterial attach='material' map={activeTexture} roughness={0.2} metalness={0.1} envMapIntensity={0.8} />
          </mesh>
          <mesh geometry={nodes.detail.geometry}>
            <meshStandardMaterial attach='material' color='#111115' />
          </mesh>
          <Marker position={[-3, 1.1, 0.2]}>
            <button className="pin-style" onClick={() => ChangeTexture(SetActiveTexture(gamification))}>
              Gamificação
            </button>
          </Marker>
          <Marker position={[2.2, 0, 0.2]} >
            <button className="pin-style" onClick={() => ChangeTexture(SetActiveTexture(ranking))}>
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
          {/* <Torus args={[4, 0.03, 60, 60]} rotation={[Math.PI * 1.5, 0, 0]} position={[0, 0, 0]} /> */}
        </mesh>
      </animated.group>
    );
  }

  return (
    <group>
      <Canvas colorManagement dpr={1, 2} camera={{ position: [0, 0, 0], fov: 60, far: 2000, }}>
        <Stage contactShadow={false} shadows={false} environment="warehouse" intensity={0.2}>
          <directionalLight color="#FF2847" position={[-5, -2.5, -2]} intensity={0.2} castShadow={false} />
          <PresentationControls
                snap={true}
                config={{ mass: 4, tension: 150, friction: 15 }}>
            <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
              <FlippingPhone />
            </Float>
            </PresentationControls>
        </Stage>
        {/* <EffectComposer multisampling={16}>
          <Bloom intensity={0.6} luminanceThreshold={0.8} luminanceSmoothing={0.5} kernelSize={5} />
        </EffectComposer> */}
      </Canvas>
    </group>
  )
}

useGLTF.preload('/phonecase.gltf')