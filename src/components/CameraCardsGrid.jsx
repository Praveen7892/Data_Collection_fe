import { Camera } from "lucide-react";
import { useState } from "react";
import CameraAOIInline from "./CameraAOIInline";
import "./camera.css";

const CameraCardsGrid = ({
  cameras,
  activeCamera,
  selectedCameras,
  onCardClick,
  onCheckboxClick,
  runningCameras,
  onSaveAOI,
}) => {
  const [openAOICameraId, setOpenAOICameraId] = useState(null);

  const runningSerials = Array.isArray(runningCameras?.camera_details)
    ? runningCameras.camera_details.map((c) => c.serial_number)
    : [];

  const safeSelectedCameras = Array.isArray(selectedCameras)
    ? selectedCameras
    : [];

  const handleCardClick = (cam) => {
    onCardClick(cam);
    setOpenAOICameraId((prev) => (prev === cam.id ? null : cam.id));
  };

  return (
    <div className="camera-grid">
      {cameras?.map((cam) => {
        const selectedCam = safeSelectedCameras.find(
          (c) => c.id === cam.id
        );

        const isChecked = !!selectedCam;
        const isRunning = runningSerials.includes(cam.serial_number);
        const isAOIOpen = openAOICameraId === cam.id;

        return (
          <div
            key={cam.id}
            className={`camera-card ${
              activeCamera?.id === cam.id ? "active" : ""
            }`}
            onClick={() => handleCardClick(cam)}
          >
            {/* HEADER */}
            <div className="camera-header">
              <div className="camera-icon">
                <Camera size={20} />
              </div>

              <div className="camera-info">
                <span className="camera-name">{cam.serial_number}</span>
                <span className="camera-resolution">
                  {cam.height}px × {cam.width}px
                </span>
              </div>

              <div
                className={`camera-checkbox ${
                  isChecked ? "checked" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onCheckboxClick(cam);
                }}
              >
                <span />
              </div>
            </div>

            {/* STATUS */}
            <div className="camera-status-row">
              <span
                className={`camera-status ${
                  cam.serial_number ? "active" : "inactive"
                }`}
              >
                {cam.serial_number ? "Active" : "Inactive"}
              </span>

              <span
                className={`camera-status ${
                  isRunning ? "running" : "notrunning"
                }`}
              >
                {isRunning ? "Online" : "Offline"}
              </span>
            </div>

            {/* AOI */}
            {isAOIOpen && (
              <CameraAOIInline
                camera={selectedCam || cam}
                onSave={(aoi) => onSaveAOI(cam.id, aoi)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CameraCardsGrid;
