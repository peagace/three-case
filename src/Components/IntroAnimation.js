import { useThree } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three'

const IntroAnim = () => {
  const { camera } = useThree()
  // Intro camera animation
  useSpring({
    from: {
      y: camera.position.y + 20
    },
    to: {
      y: camera.position.y
    },
    delay: 300,
    config: {
      friction: 100
    },
    onChange({ value }) {
      const { y } = value
      camera.position.y = y
      camera.lookAt(0, 0, 0)
      camera.fov(60)
      camera.far(2000)
    }
  })

  return <a.group></a.group>
}

export default IntroAnim
