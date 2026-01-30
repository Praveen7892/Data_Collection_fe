import CameraAOIPanel from "../components/CameraAOIPanel";
import CameraCardsGrid from "../components/CameraCardsGrid";

const InitializationPage = ({
  activeCamera,
  setActiveCamera,
  selectedCameras,
  setSelectedCameras,
  cameras,
  runningCameras,
  toggleCameraSelection,
  handleCardClick,
}) => {
  const camerasWithId = cameras?.map((cam) => ({
    ...cam,
    id: cam?.serial_number,
  }));

  return (
    <div className="camera-layout">
      <h3>Available Devices</h3>
      <CameraCardsGrid
        cameras={camerasWithId}
        runningCameras={runningCameras}
        activeCamera={activeCamera}
        selectedCameras={selectedCameras}
        onCardClick={handleCardClick}
        onCheckboxClick={toggleCameraSelection}
      />

      {activeCamera && (
        <CameraAOIPanel
          camera={activeCamera}
          onSaveAOI={(aoi) => {
            setSelectedCameras((prev) => {
              const safePrev = Array.isArray(prev) ? prev : [];

              const exists = safePrev.find((cam) => cam.id === activeCamera.id);

              if (!exists) {
                return [...safePrev, { ...activeCamera, aoi }];
              }

              return safePrev.map((cam) =>
                cam.id === activeCamera.id ? { ...cam, aoi } : cam,
              );
            });

            setActiveCamera((prev) => ({ ...prev, aoi }));
          }}
          onClose={() => setActiveCamera(null)}
        />
      )}
    </div>
  );
};

export default InitializationPage;
