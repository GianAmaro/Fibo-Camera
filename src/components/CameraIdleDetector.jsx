import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import useIdleStore from "../store/IdleStore";

// Duración en milisegundos para considerar que la cámara está "quieta"
const IDLE_DELAY_MS = 200; 

export default function CameraIdleDetector() {
    const { camera, controls } = useThree();
    const setIsMoving = useIdleStore((s) => s.setIsMoving);
    
    // Almacena la última posición/rotación conocida para la cámara
    const lastCameraState = useRef({ 
        position: camera.position.clone(),
        rotation: camera.rotation.clone(),
    });

    // Temporizador para el "debounce"
    const idleTimer = useRef(null);

    // Función para manejar el inicio/fin del movimiento
    const startMoving = () => {
        if (!useIdleStore.getState().isMoving) {
            setIsMoving(true); // Cambia el estado a MOVING (si no lo estaba)
        }
        // Reinicia el temporizador de inactividad
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(stopMoving, IDLE_DELAY_MS);
    };

    const stopMoving = () => {
        setIsMoving(false); // Cambia el estado a IDLE
    };
    
    // 1. Detección de OrbitControls (Eventos de ratón)
    // El OrbitControls dispara el evento 'change' cuando se usa el ratón.
    useEffect(() => {
        if (!controls) return; // Asegúrate de que los controles existan (vienen de <OrbitControls>)

        controls.addEventListener("change", startMoving);
        
        // Limpieza del listener
        return () => controls.removeEventListener("change", startMoving);
    }, [controls]); 

    // 2. Detección de KeyboardControls (Movimiento manual)
    // El useFrame es necesario para monitorear los cambios de posición/rotación
    // que ocurren sin disparar eventos de OrbitControls (como los movimientos del teclado).
    useFrame(() => {
        // Comprobamos si la cámara se ha movido desde el último frame
        const positionChanged = !lastCameraState.current.position.equals(camera.position);
        const rotationChanged = !lastCameraState.current.rotation.equals(camera.rotation);

        if (positionChanged || rotationChanged) {
            startMoving(); // La cámara se está moviendo (ya sea por teclado o por inercia)

            // Actualiza el estado para el siguiente frame
            lastCameraState.current.position.copy(camera.position);
            lastCameraState.current.rotation.copy(camera.rotation);
        }
    });

    return null;
}