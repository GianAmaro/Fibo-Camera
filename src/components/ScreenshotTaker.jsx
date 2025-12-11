import React, { useState, useRef } from 'react';

export default function ScreenshotTaker({ canvasRef }) {
    const [capturedImage, setCapturedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false);
    
    // Estilos (se mantienen igual)
    const buttonStyle = {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        zIndex: 20,
    };

    const formOverlayStyle = {
    position: 'fixed',
    top: 0,              // ❌ CORRECCIÓN: Cambiar 300 por 0 para que ocupe toda la ventana
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    display: 'flex', 
    justifyContent: 'center', // Centrado horizontal
    alignItems: 'center',     // Centrado vertical
    
    zIndex: 30,
};

    const formContainerStyle = {
    backgroundColor: '#333',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.8)',
    

    maxWidth: '500px', // Limita el ancho máximo a 500px (en pantallas grandes)
    width: '90%',      // Asegura que ocupe el 90% del ancho disponible (en pantallas pequeñas)
    
    maxHeight: '80vh', // Limita la altura máxima al 80% de la altura de la ventana
    overflowY: 'auto', // Permite desplazamiento vertical si el contenido (imagen + inputs) es muy largo
    
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
};

    const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #555',
    backgroundColor: '#444',
    color: 'white',
    // ✅ ASEGÚRATE DE QUE ESTO ESTÉ PRESENTE O QUE NO HAYA UN HEIGHT FIJO
    height: 'auto', 
    // Añade la siguiente línea si quieres que la altura sea visiblemente afectada por 'rows'
    resize: 'vertical' // Permite al usuario ajustar la altura verticalmente
};

    const buttonGroupStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px'
    };

    const actionButtonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        border: 'none'
    };
    


const captureScreenshot = () => {
    if (canvasRef.current) {
       
        const dataURL = canvasRef.current.toDataURL('image/png');
        setCapturedImage(dataURL);
        setShowForm(true); 
    } else {
        console.error("No se pudo acceder al canvas para la captura.");
    }
};
    // ----------------------------------------------------

    const saveScreenshot = () => {
        if (capturedImage) {
            const link = document.createElement('a');
            link.href = capturedImage;
            link.download = `${title || 'captura'}-${new Date().getTime()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log("Guardando captura:", { title, description, capturedImage });

            resetCaptureState();
        }
    };

    const deleteScreenshot = () => {
        resetCaptureState();
    };

    const resetCaptureState = () => {
        setCapturedImage(null);
        setTitle('');
        setDescription('');
        setShowForm(false);
    };

    return (
        <>
            <button onClick={captureScreenshot} style={buttonStyle}>
                📷 Capturar Escenario
            </button>

            {showForm && (
                <div style={formOverlayStyle}>
                    <div style={formContainerStyle}>
                        <h2>Guardar Captura</h2>
                        <img src={capturedImage} alt="Captura de pantalla" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />
                        
                        <label>Título:</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Nombre de la captura"
                            style={inputStyle}
                        />
                        
                        <label>Descripción:</label>
                        <textarea 
                         value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Añade una descripción"
    // ✅ Asegúrate de que este valor sea el que deseas, ej: 8, 10, o 12.
                            rows="10" 
                            style={inputStyle}
                        ></textarea>    
                        
                        <div style={buttonGroupStyle}>
                            <button onClick={saveScreenshot} style={{...actionButtonStyle, backgroundColor: '#28a745', color: 'white'}}>
                                Guardar
                            </button>
                            <button onClick={deleteScreenshot} style={{...actionButtonStyle, backgroundColor: '#dc3545', color: 'white'}}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}