import useDataCollection from "../hooks/useDataCollection";

import InitializationPage from "./InitializationPage";
import CapturePage from "./CapturePage";
import Header from "../components/Header";

const DataCollection = ({ toggleTheme, theme }) => {
  const dataCollection = useDataCollection();

  const Initialized = localStorage.getItem("initialized");

  return (
    <div className="page">
      <Header
        toggleTheme={toggleTheme}
        theme={theme}
        mode={dataCollection.mode}
        setMode={dataCollection.setMode}
        handleInitialize={dataCollection.handleInitialize}
        handleReInitialize={dataCollection.handleReInitialize}
        initialized={dataCollection.initialized}
        capture={dataCollection.capture}
        loading={dataCollection.loading}
      />
      <div className="page-content">
        <div className="page-content-left">
          <InitializationPage
            activeCamera={dataCollection.activeCamera}
            runningCameras={dataCollection.runningCameras}
            setActiveCamera={dataCollection.setActiveCamera}
            selectedCameras={dataCollection.selectedCameras}
            setSelectedCameras={dataCollection.setSelectedCameras}
            cameras={dataCollection.cameras}
            toggleCameraSelection={dataCollection.toggleCameraSelection}
            handleCardClick={dataCollection.handleCardClick}
            mode={dataCollection.mode}
            setMode={dataCollection.setMode}
            handleInitialize={dataCollection.handleInitialize}
            handleReInitialize={dataCollection.handleReInitialize}
            initialized={dataCollection.initialized}
            capture={dataCollection.capture}
            loading={dataCollection.loading}
            handleSaveAOI={dataCollection.handleSaveAOI}
          />
        </div>
        <div className="page-content-right">
          <CapturePage
            data={dataCollection.data}
            capture={dataCollection.capture}
            loading={dataCollection.loading}
            error={dataCollection.error}
          />
        </div>

      </div>
    </div>
  );
};

export default DataCollection;
