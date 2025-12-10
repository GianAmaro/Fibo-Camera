import { useEffect, useRef } from "react";
// Importa useThree y AHORA useFrame
import { useThree, useFrame } from "@react-three/fiber"; 
import * as THREE from "three";

export default function KeyboardControls() {
  const { camera } = useThree();
  const keys = useRef({});
  // Inicializa los vectores fuera del loop para mejor rendimiento
  const direction = useRef(new THREE.Vector3());
  const right = useRef(new THREE.Vector3());
  const speed = 0.05; // La velocidad sigue siendo constante

  // 1. Efecto para manejar eventos del teclado (SIN CAMBIOS)
  useEffect(() => {
    const onKeyDown = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };
    const onKeyUp = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // 2. USA useFrame para la lógica de actualización (NUEVO CÓDIGO)
  // 'state' y 'delta' son pasados automáticamente por R3F
  useFrame(() => {
    if (
      !keys.current["w"] &&
      !keys.current["s"] &&
      !keys.current["a"] &&
      !keys.current["d"]
    ) {
      return; // No hacer nada si no hay teclas presionadas
    }
    
    // Obtener la dirección frontal de la cámara (sin movimiento Y vertical)
    camera.getWorldDirection(direction.current);
    direction.current.y = 0;
    direction.current.normalize();

    // Obtener la dirección lateral (derecha)
    right.current.copy(direction.current).cross(camera.up).normalize();

    // Aplicar movimiento
    if (keys.current["w"]) camera.position.addScaledVector(direction.current, speed);
    if (keys.current["s"]) camera.position.addScaledVector(direction.current, -speed);
    if (keys.current["a"]) camera.position.addScaledVector(right.current, -speed);
    if (keys.current["d"]) camera.position.addScaledVector(right.current, speed);
  });

  return null;
}