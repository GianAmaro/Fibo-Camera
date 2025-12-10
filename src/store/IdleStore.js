// src/store/IdleStore.js

import { create } from 'zustand';

// ✅ Asegúrate de tener "export default" aquí
const useIdleStore = create((set) => ({
    // Estado que indica si la cámara está actualmente moviéndose
    isMoving: false, 
    
    // Función para actualizar el estado
    setIsMoving: (state) => set({ isMoving: state }),
}));

export default useIdleStore; // <-- ¡Asegúrate de que esta línea esté presente!