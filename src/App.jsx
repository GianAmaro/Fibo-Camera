import "./App.css";
import Scene3D from "./UI/Scene3D";
import CameraPanel from "./UI/CameraPanel";

function App() {
  return (
    <>
      <h1>Mi Escena 3D</h1>

      {/* Contenedor de la escena */}
      <div style={{ width: "100%", height: "400px", border: "1px solid #444" }}>
        <Scene3D />
      </div>

      {/* Panel donde muestras los datos de la cámara */}
      <CameraPanel />

      {/* resto de tu app */}
    </>
  );
}

export default App;
