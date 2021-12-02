import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, CameraShake, Environment } from '@react-three/drei'

//Bouncy controlls Spring Animations
export default function CameraParallax () {
    const [vec] = useState(() => new THREE.Vector3())
    const { camera, mouse } = useThree()
    useFrame(() => camera.position.lerp(vec.set(mouse.x * -2, 1, 60), 0.05))
    return <group/>
}