import * as THREE from 'three'
import React, { useState, useRef } from 'react'
import { useGLTF, useTexture, PresentationControls, Sphere, useScroll, ScrollControls } from '@react-three/drei'
import { a, useSpring, animated, config } from '@react-spring/three'
import { Canvas, useFrame } from '@react-three/fiber'


export default function AboutTriangle(props) {

    const ref = useRef()
    const scroll = useScroll()
    useFrame(() => (ref.current.rotation.y = scroll.offset * 10))

    return (
        <group position={[0, 0, 0]} ref={ref}>
            <PresentationControls
                snap={true}
                config={{ mass: 4, tension: 150, friction: 15 }}>
                <mesh
                    {...props}
                    scale={0.3}
                    position={[0, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshStandardMaterial color={'off-white'} />
                </mesh>
            </PresentationControls>
        </group>
    )

}