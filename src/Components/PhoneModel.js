import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useGLTF, Html, useTexture, } from '@react-three/drei'
import { useFrame, useThree  } from '@react-three/fiber';

function Marker({ children, ...props }) {
  // This holds the visible state
  const [hidden, set] = useState()
  
  return (
    <Html
      transform
      occlude
      // The <Html> component can tell us when something is occluded (or not)
      onOcclude={set}
      // We just interpolate the visible state into css opacity and transforms
      style={{ transition: 'all 0.2s', opacity: hidden ? 0 : 1, transform: `scale(${hidden ? 0.25 : 1})` }}
      {...props}
      >
      {children}
    </Html>
  )
}

export default function Model(props) {

  const group = useRef()

  //GLT loader
  const { nodes } = useGLTF('/phonecase.gltf')  

  //Texturas
  const [home, gamification, ranking, quizz, store] = useTexture(['/default.png', '/gamification.png', '/ranking.png', '/quizz.png', '/store.png'])
  const [activeTexture, SetActiveTexture] = useState(home)
  home.flipY = false;
  gamification.flipY = false;  
  ranking.flipY = false;  
  quizz.flipY = false;  
  store.flipY = false; 

  function SetDefault(){
    SetActiveTexture(home) 
  }

  function SetGamification(){
    SetActiveTexture(gamification) 
  }

  function SetRanking(){
    SetActiveTexture(ranking) 
  }

  function SetQuizz(){
    SetActiveTexture(quizz) 
  }

  function SetStore(){
    SetActiveTexture(store) 
  }

  //Look at parallax - Duro
  //const { mouse } = useThree() 

  // useFrame(() => {
  //   group.current.rotation.x = Math.sin(mouse.y * -0.3)
  //   group.current.rotation.y = Math.sin(mouse.x * 0.3)
  //   })    
  
  //Float animation - Opção 1
  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime()
  //   group.current.rotation.set(0.1 + Math.cos(t / 4.5) / 10, Math.sin(t / 4) / 4, 0.3 - (1 + Math.sin(t / 4)) / 8)
  //   group.current.position.y = (1 + Math.sin(t / 2)) / 10
  // })

  //Float animation - Opção 2
  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime()
  //   group.current.rotation.z = -0.1 - (Math.sin(t / 1.5)) / 20
  //   group.current.rotation.x = -Math.PI / 20 + Math.cos(t / 2) / 30
  //   group.current.rotation.y = Math.sin(t / 4) / 4
  //   group.current.position.y = (1 + Math.sin(t / 1.5)) / 20
  // })

  return (
    <group ref={group} {...props} dispose={null} scale={1} position={0,0,0}>
        <mesh geometry={nodes.casephone.geometry}>
          <meshStandardMaterial attach='material' color='#111115' roughness={0.45} metalness={1} opacity={0.7} envMapIntensity={1}/>
          <Marker position={[-3, 1, 0.4]}>
            {/* Anything in here is regular HTML, these markers are from font-awesome */}
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
        </mesh>
        <mesh geometry={nodes.tela.geometry}>
          <meshStandardMaterial attach='material' map={activeTexture} roughness={0.3} metalness={0.2} envMapIntensity={0.2}/>
        </mesh>

        {/* Vidro, ficou ruim */}
        {/* <mesh geometry={nodes.vidro.geometry}>
          <meshStandardMaterial attach='material' color='#373756' roughness={0.3} transparent={true} metalness={0.5} opacity={0.01} envMapIntensity={0.2}/>
        </mesh> */}

        {/* Detalhe para orientação */}
        <mesh geometry={nodes.detail.geometry}>
          <meshStandardMaterial attach='material' color='#111115'/>
        </mesh> 
    </group>
  )
}

useGLTF.preload('/phonecase.gltf')