import * as THREE from 'three'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useGLTF, Html, useTexture, } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { a, useSpring, animated, config } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'
import { MathUtils } from 'three'

//Bouncy controlls Spring Animations
export default function BouncyControls({ children }) {
    const { size, gl } = useThree()
    const [props, api] = useSpring(() => ({ rotation: [0, 0, 0], config: { mass: 4, friction: 40, precision: 0.001 } }), [])
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