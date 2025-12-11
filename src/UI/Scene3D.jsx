import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react"; // Necesario para crear la referencia del Canvas

import CameraTracker from "../components/CameraControls"; 
import KeyboardControls from "../components/KeyboardControls";
import CameraIdleDetector from "../components/CameraIdleDetector";
import ScreenshotTaker from "../components/ScreenshotTaker"; 

export default function Scene3D() {
  const canvasRef = useRef(); // Referencia para acceder al elemento DOM del Canvas

  return (
    <>
      <Canvas 
        ref={canvasRef} // Asignamos la referencia al Canvas
        camera={{ position: [0, 2, 5], fov: 35 }}
        // CONFIGURACIÓN CLAVE PARA LA CAPTURA DE PANTALLA:
        // Evita que el buffer de dibujo se borre después de cada render.
        gl={{ preserveDrawingBuffer: true }} 
      >
        {/* Componentes de Control y Estado */}
        <CameraTracker />
        <KeyboardControls />
        <CameraIdleDetector /> 
        
        {/* Controles de Ratón */}
        <OrbitControls makeDefault enableZoom enablePan /> 
        
        {/* Objeto de la Escena */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Luces (Ajustadas para visibilidad) */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
      </Canvas>
      
      {/* Interfaz de Usuario (UI) */}
      {/* El CameraPanel está en App.jsx, pero el ScreenshotTaker necesita la ref del Canvas */}
      <ScreenshotTaker canvasRef={canvasRef} /> 
    </>
  );
}