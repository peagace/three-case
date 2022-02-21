import * as THREE from 'three'
import { MathUtils } from 'three'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Stage, Float, Html, Loader, useGLTF, useTexture, PresentationControls, Environment, ScrollControls, useScroll, Scroll } from '@react-three/drei'
import { a, useSpring, animated, config } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'
import { StickyContainer, Sticky } from 'react-sticky';

//Images
import hkpLogo from '../Assets/Images/logo-default.svg'
import headerBtn from '../Assets/Images/menu.svg'
import purpleBg from '../Assets/Images/plain-bg-purple.png'
import serviceIcon from '../Assets/Images/gamification.svg'

//Components
import Services from '../Components/ServicesSquare'
import ServicesTriangle from '../Components/ServicesTriangle'
import ServicesIdk from '../Components/ServicesIdk'
import Overlay from "../Components/Overlay"
import AboutTriangle from '../Components/AboutTriangle'



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

            <div style={{ height: "1200px", width: '100%', backgroundColor: '#FF2847', justifyContent: 'center', textAlign: 'center', display: "flex", flexDirection: 'column' }}>
                <h1 className='text-h1' style={{ marginBottom: "40px" }}>Somos um estúdio digital<br />de criatividade.</h1>
                <h3 className='text-h3' style={{ marginBottom: "90px" }}>Combinamos design autêntico com tecnologia de ponta para gerar transformação digital ao seu negócio.</h3>
            </div>

            <div style={{ height: "2000px" }}>
                <h1 className='text-h1' style={{ margin: "100px", paddingLeft: "90px" }}>Nossos projetos</h1>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <div style={{ height: "716px", width: "538px", backgroundColor: 'orange', margin: '10px' }} />
                    <div style={{ height: "716px", width: "889px", backgroundColor: 'blue', margin: '10px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '50px' }}>
                    <div style={{ height: "716px", width: "538px", backgroundColor: 'green', margin: '10px' }} />
                    <div style={{ height: "716px", width: "889px", backgroundColor: 'grey', margin: '10px' }} />
                </div>
            </div>

            
            <AboutScroll />
          

            <ChangeService />

        </>
    );
}

function ChangeService() {

    // const [service, setService] = useState(false);

    // const { enterService, enterRotate } = useSpring({
    //     enterService: service ? 0 : 1,
    //     enterRotate: service ? [0,Math.PI*2,Math.PI*0.5] : [0,0,0],
    //     config: config.wobbly
    // });

    // const { exitService, exitRotate } = useSpring({
    //     exitService: service ? 0 : -1 ,
    //     exitRotate: service ? [0,Math.PI*2,Math.PI*0.5] : [0,0,0],
    //     config: config.slow
    // });

    // function WhichService() {
    //     setService(!service)
    // }



    //New

    //True = animação de entrada, false = animação de saída

    const [app, setApp] = useState(true);
    const [website, setWebsite] = useState(false);
    const [gamification, setGamification] = useState(false);


    const { enterServiceApp, exitServiceApp } = useSpring({
        enterServiceApp: app ? 1 : 0,
        exitServiceApp: app ? -1 : 0,
        config: config.slow
    });

    const { enterServiceWebsite, exitServiceWebsite } = useSpring({
        enterServiceWebsite: website ? 1 : 0,
        exitServiceWebsite: website ? -1 : 0,
        config: config.slow
    });

    const { enterServiceGamification, exitServiceGamification } = useSpring({
        enterServiceGamification: gamification ? 1 : 0,
        exitServiceGamification: gamification ? -1 : 0,
        config: config.slow
    });

    function ServiceApp() {
        setApp(true)
        setWebsite(false)
        setGamification(false)
        console.log("app: " + app, "web: " + website, "game: " + gamification)
    }

    function ServiceWebsite() {
        setWebsite(true)
        setApp(false)
        setGamification(false)
        console.log("app: " + app, "web: " + website, "game: " + gamification)
    }

    function ServiceGamification() {
        setGamification(true)
        setApp(false)
        setWebsite(false)
        console.log("app: " + app, "web: " + website, "game: " + gamification)
    }

    return (
        <>
            <div className="services-container">
                <img src={purpleBg} className="showoff-bg" />
                <div className="services-objects">
                    <Suspense fallback={<Loader />}>
                        <Canvas colorManagement dpr={1, 2} camera={{ position: [2, 0, 0], fov: 25, far: 2000, }}>
                            <Environment preset='warehouse' />
                            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.5}>
                                <animated.mesh position={[0, 0, 0]} position-y={app ? enterServiceApp : exitServiceApp}>
                                    <Services />
                                </animated.mesh>
                                <animated.mesh position={[0, -1, 0]} position-y={website ? enterServiceWebsite : exitServiceWebsite}>
                                    <ServicesTriangle />
                                </animated.mesh>
                                <animated.mesh position={[0, -1, 0]} position-y={gamification ? enterServiceGamification : exitServiceGamification}>
                                    <ServicesIdk />
                                </animated.mesh>
                            </Float>
                        </Canvas>
                    </Suspense>
                </div>

                <div className="services-information">
                    <img src={serviceIcon} className='serviceIcon' />
                    <h1 className='text-h1'>Gamificação</h1>
                    <h3 className='text-h3'>Elaboração de conceitos e plataformas gamificados.</h3>
                    <h5 className='text-h3'>Ver mais</h5>

                    <div className='services-navigator'>
                        <div className='services-navigator-selected' onClick={() => ServiceApp()} />
                        <div className='services-navigator-inactive' onClick={() => ServiceWebsite()} />
                        <div className='services-navigator-inactive' onClick={() => ServiceGamification()} />
                    </div>
                </div>


            </div>

        </>
    );

}


function AboutScroll() {
    

    return (
        <>
            <StickyContainer>
                <div className="about-container">
                    <div className="about-left-content">
                        <h1 className='text-h1' style={{ marginTop: '160px' }}>Projetos criativos, da idealização ao lançamento.</h1>
                    </div>
                    <div className='scroll-canvas'>
                            <Suspense fallback={<Loader />}>
                                <Canvas colorManagement dpr={1, 2} camera={{ position: [2, 0, 0], fov: 25, far: 2000, }}>
                                    <Environment preset='warehouse' />
                                    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.5}>
                                        <ScrollControls pages={3} distance={1}>
                                            <AboutTriangle/>
                                            <Scroll html >
                                                <div className="about-right-content">
                                                    <div style={{ height: "50vh", marginTop: '500px' }}>
                                                        <h3 className='text-h3'>01. Idealização</h3>
                                                        <h5 className='text-h3'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.</h5>
                                                    </div>

                                                    <div style={{ height: "50vh" }}>
                                                        <h3 className='text-h3'>02. Desenvolvimento</h3>
                                                        <h5 className='text-h3'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.</h5>
                                                    </div>

                                                    <div style={{ height: "50vh" }}>
                                                        <h3 className='text-h3'>03. Lançamento</h3>
                                                        <h5 className='text-h3'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.</h5>
                                                    </div>
                                                </div>
                                            </Scroll>
                                        </ScrollControls>
                                    </Float>
                                </Canvas>
                            </Suspense>
                        </div>
                </div>
            </StickyContainer>
        </>
    );

}
