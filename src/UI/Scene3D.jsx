import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import CameraTracker from "../components/CameraControls"; 
import KeyboardControls from "../components/KeyboardControls";
import CameraIdleDetector from "../components/CameraIdleDetector"; // <-- NUEVO

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 35 }}>
      <CameraTracker />
      <KeyboardControls />
      
      {/* Colocamos el detector junto a los controles */}
      <CameraIdleDetector /> 
      
      {/* makeDefault es útil para que useThree sepa cuáles son los controles principales */}
      <OrbitControls makeDefault enableZoom enablePan /> 
      
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
    </Canvas>
  );
}