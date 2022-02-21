import * as THREE from 'three'
import React, { useState } from 'react'
import { useGLTF, useTexture, PresentationControls, Float, Stage } from '@react-three/drei'
import { a, useSpring, animated, config } from '@react-spring/three'
import { Canvas, useFrame } from '@react-three/fiber'


export default function Services(props) {

    return (
        <group position={[0, 0, 0]} >
            <PresentationControls
                snap={true}
                config={{ mass: 4, tension: 150, friction: 15 }}>
                <mesh
                    {...props}
                    scale={0.3}
                    position={[0, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshStandardMaterial color={'hotpink'} />
                </mesh>
            </PresentationControls>
        </group>
    )

}