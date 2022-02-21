import * as THREE from 'three'
import React, { useState } from 'react'
import { useGLTF, useTexture, PresentationControls, Float, Stage, Plane, Cylinder } from '@react-three/drei'
import { a, useSpring, animated, config } from '@react-spring/three'

export default function ServicesIdk(props) {

    return (
        <group position={[0, 0, 0]} >
            <PresentationControls
                snap={true}
                config={{ mass: 4, tension: 150, friction: 15 }}>
            <mesh
                {...props}
                scale={0.2}
                position={[0,0,0]}>
                <Cylinder>
                <meshStandardMaterial color={'purple'} />
                </Cylinder>
            </mesh>
            </PresentationControls>
        </group>
    )
}