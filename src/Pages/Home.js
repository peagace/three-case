import * as THREE from 'three'
import { MathUtils } from 'three'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Stage, Float, Html, Loader } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

//Images
import hkpLogo from '../Assets/Images/logo-default.svg'
import headerBtn from '../Assets/Images/menu.svg'
import purpleBg from '../Assets/Images/plain-bg-purple.png'

//Components
import Phone from '../Components/PhoneModel'
import IntroAnim from '../Components/IntroAnimation'
import BouncyControls from '../Components/Controls'
import CameraParallax from '../Components/CameraParallax'


export default function Home() {
    const [modal, setModal] = useState(false)


    return (
        <>
            <div className="header">
                <div className="header-content">
                    <img src={hkpLogo} />
                    <img src={headerBtn} onClick={() => { setModal(true) }} />
                </div>
            </div>

            <div className="showoff-container">
                <img src={purpleBg} className="showoff-bg" />
                <Suspense fallback={<Loader />}>
                    <Canvas colorManagement dpr={1, 2} camera={{ position: [0, 0, 0], fov: 60, far: 2000, }}>
                        <Stage contactShadow={false} shadows={false} environment="warehouse" intensity={0.2}>
                            <directionalLight color="#FF2847" position={[-5, -2.5, -2]} intensity={0.2} castShadow={false} />
                            <BouncyControls>
                                <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
                                    <Phone />
                                </Float>
                            </BouncyControls>
                        </Stage>
                        <EffectComposer multisampling={16}>
                            <Bloom intensity={0.6} luminanceThreshold={0.8} luminanceSmoothing={0.5} kernelSize={5} />
                        </EffectComposer>
                    </Canvas>
                </Suspense>
            </div>

            <div className="case-container">
                <div className="case-content">
                    <div className="case-about">
                        <h1>Sobre o projeto</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nulla odio, sodales vitae dui sed, sagittis pretium ligula. Vestibulum ornare non felis vel fermentum.</p>
                        <div className="case-icon-container">
                            <div className="case-icon"></div>
                            <div className="case-icon"></div>
                            <div className="case-icon"></div>
                        </div>
                    </div>
                    <div className="case-steps"></div>
                </div>
            </div>

            {modal ? (
                <div className="modal">
                    <button onClick={() => {
                        setModal(false)
                    }}>CLOSE</button>
                </div>
            ) : (null)}
        </>
    );
}
