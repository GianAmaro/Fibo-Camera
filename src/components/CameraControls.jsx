// src/components/CameraControls.jsx
import { useThree, useFrame } from "@react-three/fiber";
import useCameraStore from "../store/CameraStore";
import { useEffect } from "react";

// ✅ AQUÍ ESTÁ LA CLAVE: "export default"
export default function CameraTracker() {
  const { camera } = useThree();
  const setCamera = useCameraStore((s) => s.setCamera);

  // Usamos useFrame para mantener el store sincronizado suavemente
  useFrame(() => {
    setCamera({
      position: camera.position.toArray(),
      rotation: camera.rotation.toArray().slice(0, 3),
      fov: camera.fov,
    });
  });

  return null;
}