import * as THREE from 'three'
import { MathUtils } from 'three'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Stage, Float } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'

//Images
import hkpLogo from '../Assets/Images/logo-default.svg'
import headerBtn from '../Assets/Images/menu.svg'
import purpleBg from '../Assets/Images/plain-bg-purple.png'

//Components
import Phone from '../Components/PhoneModel'

export default function Home() {
    const [modal, setModal] = useState(false)
    const ref = useRef()
    const [headerSwitch, setHeader] = useState(false)

    function ChangeHeader() {
        setHeader(!headerSwitch)
        if (headerSwitch === true) {

        }
        else {

        }
        return console.log(headerSwitch)
    }

    //Camera parallax - Está bubugando o OrbitControls
    // function Rig() {
    //     const { camera, mouse } = useThree()
    //     const vec = new THREE.Vector3()
    //     return useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 0.1, camera.position.z), 0.003))
    // }

    //Bouncy controlls Spring Animations
    function BouncyControls({ children }) {
        const { size, gl } = useThree()
        const [props, api] = useSpring(() => ({ rotation: [0, 0, 0], config: { mass: 5, friction: 90, precision: 0.0001 } }), [])
        useDrag(
            ({ movement: [x, y], down }) => {
                y = MathUtils.clamp(y / size.height, -1, 1) * Math.PI
                x = MathUtils.clamp(x / size.width, -1, 1) * Math.PI
                api.start({ rotation: down ? [y / 2, x * 1.25, 0] : [0, 0, 0], config: { tension: down ? 500 : 1500 } })
            },
            { target: gl.domElement }
        )
        return <a.group {...props}>{children}</a.group>
    }


    return (
        <>
            <div className="header">
                <div className="header-content">
                    <img src={hkpLogo} />
                    <img src={headerBtn} onClick={() => ChangeHeader()} />
                </div>
            </div>

            <div className="showoff-container">
                <img src={purpleBg} className="showoff-bg" />
                <Canvas colorManagement camera={{ position: [0, 0, 0], fov: 60, far: 2000, }}>
                    <Suspense fallback={null}>
                        <Stage controls={ref} contactShadow={false} shadows={false} environment="warehouse" intensity={0.2}>
                            <BouncyControls>
                                <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
                                <Phone />
                                </Float>
                            </BouncyControls>
                            <directionalLight color="#FF2847" position={[-5, -2.5, -2]} intensity={0.2} castShadow={false} />
                        </Stage>
                    </Suspense>
                    {/* <Rig/> */}
                </Canvas>
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
        </>
    );
}
