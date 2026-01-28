import React, { useState, useRef, useMemo } from "react";
import { FaCamera } from "react-icons/fa";
import { MdCameraAlt } from "react-icons/md";
import { Camera } from "lucide-react";
import { FiSettings } from "react-icons/fi";
import { MdSettings } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSlidersH } from "react-icons/fa";
import useDataCollection from "../hooks/useDataCollection";

import InitializationPage from "./InitializationPage";
import CapturePage from "./CapturePage";
import Header from "../components/Header";
import { data } from "autoprefixer";

const DataCollection = ({ toggleTheme, theme }) => {
  const dataCollection = useDataCollection();


  console.log(dataCollection.data ,"::: dataCollection.data");

  // const MAX_CAMERAS = 1;

  // const images = useMemo(() => {
  //   return Array.from({ length: MAX_CAMERAS }, (_, i) => {
  //     const url = dataCollection.data?.response?.captured_images?.[i] ?? null;
  //     return {
  //       id: i,
  //       name: `Camera ${i + 1}`,
  //       src: url,
  //       status: url ? "active" : "inactive",
  //     };
  //   });
  // }, [dataCollection.data]);

  // return (
  //   <div className="page">
  //     <Header toggleTheme={toggleTheme} theme={theme} />
  //     <div className="page-content">
  //       <div className="page-content-left">
  //         {" "}
  //         <div className="camera-grid">
  //           {images.map((image) => (
  //             <CameraCard key={image.id} {...image} />
  //           ))}
  //         </div>
  //       </div>
  //       {/* <div className="page-content-right">
  //         {" "}
  //         <Configuration
  //           cameras={cameras}
  //           capture={capture}
  //           loading={loading}
  //           error={error}
  //         />
  //       </div> */}
  //     </div>
  //   </div>
  // );
  // };

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

      {!dataCollection.initialized ? (
        <InitializationPage
          activeCamera={dataCollection.activeCamera}
          setActiveCamera={dataCollection.setActiveCamera}
          selectedCameras={dataCollection.selectedCameras}
          setSelectedCameras={dataCollection.setActiveCamera}
          cameras={dataCollection.cameras}
          toggleCameraSelection={dataCollection.toggleCameraSelection}
          handleCardClick={dataCollection.handleCardClick}
        />
      ) : (
        <CapturePage
          data={dataCollection.data}
          // cameras={dataCollection.cameras}
          capture={dataCollection.capture}
          loading={dataCollection.loading}
          error={dataCollection.error}
        />
      )}
    </div>
  );
};

const Configuration = ({ cameras, capture, loading, error }) => {
  const [path, setPath] = useState("");
  const dirInputRef = useRef(null);

  const handleBrowse = () => {
    dirInputRef.current.click();
  };

  const handleDirectoryChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const folderName = files[0].webkitRelativePath.split("/")[0];
      setPath(folderName);
    }

    console.log(path);
  };

  return (
    <div className="configuration">
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "20px",
          color: "var(--color-primary)",
        }}
      >
        <MdSettings size={23} />
        Configuration
      </h2>

      {/* <div className="path-selector">
        <input
          type="text"
          value={path}
          readOnly
          placeholder="Select folder..."
          className="input-file-path"
        />

        <button className="path-selector-browse-btn" onClick={handleBrowse}>Browse</button>

        <input
          type="file"
          ref={dirInputRef}
          style={{ display: "none" }}
          webkitdirectory="true"
          onChange={handleDirectoryChange}
        />
      </div> */}
      <h4>Available Devices</h4>
      <p>
        {cameras?.map((camera) => (
          <p>{camera.serial_number}</p>
        ))}
      </p>
      {/* <div className="toggle-buttons">
        <button
          className={mode === "software" ? "active" : ""}
          onClick={() => setMode("software")}
        >
          Software
        </button>

        <button
          className={mode === "hardware" ? "active" : ""}
          onClick={() => setMode("hardware")}
        >
          Hardware
        </button>
      </div> */}

      <div>
        {/* {mode === "software" && (
          <button
            className="path-selector-browse-btn"
            onClick={capture}
            disabled={loading}
          >
            {loading ? "Capturing..." : "Capture"}
          </button>
        )}

        {mode === "hardware" && (
          <p className="hardware-msg">
            Hardware Trigger Enabled - <br /> Cameras capture on external signal
          </p>
        )} */}
      </div>
    </div>
  );
};

const CameraCard = ({ name, status = "active", src }) => {
  return (
    <div className="camera-card">
      <div className="camera-preview">
        {src ? (
          <img src={src} alt={src} className="camera-image" />
        ) : (
          <Camera size={50} className="camera-icon" />
        )}
      </div>

      <div className="camera-footer">
        <span className="camera-name">{name}</span>
        <span
          className={`camera-status ${
            status === "active" ? "active" : "inactive"
          }`}
        >
          {status === "active" ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
};

export default DataCollection;
