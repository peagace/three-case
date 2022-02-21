import * as THREE from 'three'
import { MathUtils } from 'three'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Stage, Float, Html, Loader } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'
//import { EffectComposer, Bloom } from '@react-three/postprocessing'

//Images
import hkpLogo from '../Assets/Images/logo-default.svg'
import headerBtn from '../Assets/Images/menu.svg'
import purpleBg from '../Assets/Images/plain-bg-purple.png'

//Components
import Phone from '../Components/PhoneModel'



export default function Radioteraquiz() {
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
                   <Phone/>
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
