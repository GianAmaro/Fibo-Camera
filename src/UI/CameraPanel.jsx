import useCameraStore from "../store/CameraStore.js";
import useIdleStore from "../store/IdleStore.js"; 

const formatNumber = (num) => {
    if (Array.isArray(num)) {
        // Redondeamos los valores a 2 decimales para la visualización
        return num.map(n => n.toFixed(2)).join(', ');
    }
    return num.toFixed(2);
};

const DataRow = ({ label, value, unit = '' }) => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '4px 0', 
        borderBottom: '1px dotted #555' 
    }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span>{value} {unit}</span>
    </div>
);


export default function CameraPanel() {
    const { position, rotation, fov } = useCameraStore();
    const isMoving = useIdleStore((state) => state.isMoving);

    // Estilos generales del panel
    const panelStyle = {
        // ----------------------------------------------------
        // ✅ AÑADIDO: Posicionamiento en la esquina superior izquierda
        position: 'fixed', 
        top: '20px', 
        left: '20px', 
        zIndex: 100, // Asegura que esté por encima del Canvas
        // ----------------------------------------------------

        width: '300px',
        background: 'rgba(44, 44, 44, 0.95)', // Fondo oscuro semi-transparente
        color: '#ffffff',     
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        fontFamily: 'monospace', 
        fontSize: '14px'
    };
    
    // ... (El resto del estilo y la lógica de statusStyle sigue igual)

    const statusStyle = {
        fontWeight: 'bold',
        padding: '5px 10px',
        borderRadius: '4px',
        backgroundColor: isMoving ? '#d9534f' : '#5cb85c', 
        color: '#fff',
        textAlign: 'center',
        marginBottom: '10px'
    };

    return (
        <div style={panelStyle}>
            <h3>👁️ Panel de Control de Cámara</h3>
            
            <div style={statusStyle}>
                {isMoving ? "🔴 MOVIMIENTO DETECTADO" : "🟢 CÁMARA INACTIVA"}
            </div>

            <div style={{ marginBottom: '10px' }}>
                <h4 style={{ margin: '5px 0', borderBottom: '1px solid #444' }}>📍 Posición (X, Y, Z)</h4>
                <DataRow label="X, Y, Z" value={formatNumber(position)} />
                
                <h4 style={{ margin: '5px 0', borderBottom: '1px solid #444' }}>🔄 Rotación (X, Y, Z)</h4>
                <DataRow label="Pitch, Yaw, Roll" value={formatNumber(rotation)} />
                
                <h4 style={{ margin: '5px 0', borderBottom: '1px solid #444' }}>📐 Campo de Visión</h4>
                <DataRow label="FOV" value={formatNumber(fov)} unit="grados" />
            </div>
        </div>
    );
}