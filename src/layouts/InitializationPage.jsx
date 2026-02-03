import CameraCardsGrid from "../components/CameraCardsGrid";
import { Network } from "lucide-react";

const InitializationPage = ({
  activeCamera,
  setActiveCamera,
  selectedCameras,
  setSelectedCameras,
  cameras,
  runningCameras,
  toggleCameraSelection,
  handleCardClick,

  mode,
  setMode,
  handleInitialize,
  handleReInitialize,
  initialized,
  capture,
  loading,
}) => {
  const camerasWithId = cameras?.map((cam) => ({
    ...cam,
    id: cam?.serial_number,
  }));

  const Initialized = localStorage.getItem("initialized");

  return (
    <div
      className="config-layout"
      style={{
        display: "flex",
        flexDirection: "column",
        height:"100%"
      }}
    >
      <h3 style={{display:"flex" , alignItems:"center", gap:"10px", borderBottom:"1px solid var(--color-border)", padding:"var(--space-sm) 0"}}> <Network size={20} />Available Devices</h3>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <CameraCardsGrid
            cameras={camerasWithId}
            runningCameras={runningCameras}
            activeCamera={activeCamera}
            selectedCameras={selectedCameras}
            onCardClick={handleCardClick}
            onCheckboxClick={toggleCameraSelection}
            // onSaveAOI={}
          />
        </div>

        {/* Bottom section sticks at bottom */}
        <div className="bottom-controls">
          <div className="tab-buttons">
            <button
              type="button"
              className={mode === "SOFTWARE" ? "active" : ""}
              onClick={() => setMode("SOFTWARE")}
            >
              Software
            </button>
            <button
              type="button"
              className={mode === "HARDWARE" ? "active" : ""}
              onClick={() => setMode("HARDWARE")}
            >
              Hardware
            </button>
          </div>

          <button className="initialize-btn" onClick={handleInitialize}>
            Initialize
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitializationPage;
