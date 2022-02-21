import * as THREE from 'three'
import React, { useState } from 'react'
import { useGLTF, useTexture, PresentationControls, Float, Stage, Plane, Sphere } from '@react-three/drei'
import { a, useSpring, animated, config } from '@react-spring/three'
import { Canvas } from '@react-three/fiber'


export default function ServicesTriangle(props) {

    return (
        <group position={[0, 0, 0]} >
            <PresentationControls
                snap={true}
                config={{ mass: 4, tension: 150, friction: 15 }}>
            <mesh
                {...props}
                scale={0.2}
                position={[0,0,0]}>
                <Sphere>
                <meshStandardMaterial color={'orange'} />
                </Sphere>
            </mesh>
            </PresentationControls>
        </group>
    )

}