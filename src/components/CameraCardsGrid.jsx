// import { Camera } from "lucide-react";
// import "./camera.css";

// const CameraCardsGrid = ({
//   cameras,
//   activeCamera,
//   selectedCameras,
//   onCardClick,
//   onCheckboxClick,
//   runningCameras,
// }) => {

//   return (

//     <div className="camera-grid">
//       {cameras?.map((cam) => {
//         const isActive = activeCamera?.id === cam.id;
//         const safeSelectedCameras = Array.isArray(selectedCameras)
//           ? selectedCameras
//           : [];

//         const selectedCam = safeSelectedCameras.find((c) => c.id === cam.id);

//         const isChecked = !!selectedCam;
//         const hasAOI = !!selectedCam?.aoi;

//         return (
//           <div
//             key={cam.id}
//             className={`camera-card ${isActive ? "active" : ""}`}
//             onClick={() => onCardClick(cam)}
//           >
//             <div className="camera-icon">
//               <Camera size={20} />
//             </div>

//             <div className="camera-info">
//               <span className="camera-name">{cam.serial_number} ###- {runningCameras.serial_number}</span>

//               {hasAOI ? (
//                 <span className="camera-resolution">
//                   {selectedCam.aoi.width}px × {selectedCam.aoi.height}px
//                 </span>
//               ) : (
//                 <span className="camera-resolution">
//                   {cam.height}px × {cam.width}px{" "}
//                 </span>
//               )}
//             </div>

//             <div
//               className={`camera-checkbox ${isChecked ? "checked" : ""}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onCheckboxClick(cam);
//               }}
//             >
//               <span />
//             </div>

//             <span
//               className={`camera-status ${
//                 cam.serial_number ? "active" : "inactive"
//               }`}
//             >
//               {cam.serial_number ? "Active" : "Inactive"}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CameraCardsGrid;

import { Camera } from "lucide-react";
import "./camera.css";

const CameraCardsGrid = ({
  cameras,
  activeCamera,
  selectedCameras,
  onCardClick,
  onCheckboxClick,
  runningCameras,
}) => {
  // Extract running camera serial numbers
  const runningSerials = Array.isArray(runningCameras?.camera_details)
    ? runningCameras.camera_details.map((c) => c.serial_number)
    : [];

  return (
    <div className="camera-grid">
      {cameras?.map((cam) => {
        const isActive = activeCamera?.id === cam.id;
        const safeSelectedCameras = Array.isArray(selectedCameras)
          ? selectedCameras
          : [];

        const selectedCam = safeSelectedCameras.find((c) => c.id === cam.id);

        const isChecked = !!selectedCam;
        const hasAOI = !!selectedCam?.aoi;

        // Check if camera is currently running
        const isRunning = runningSerials.includes(cam.serial_number);

        return (
          <div
            key={cam.id}
            className={`camera-card ${isActive ? "active" : ""}`}
            onClick={() => onCardClick(cam)}
          >
            <div className="camera-icon">
              <Camera size={20} />
            </div>

            <div className="camera-info">
              <span className="camera-name">{cam.serial_number}</span>

              {hasAOI ? (
                <span className="camera-resolution">
                  {selectedCam.aoi.width}px × {selectedCam.aoi.height}px
                </span>
              ) : (
                <span className="camera-resolution">
                  {cam.height}px × {cam.width}px{" "}
                </span>
              )}
            </div>

            <div
              className={`camera-checkbox ${isChecked ? "checked" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onCheckboxClick(cam);
              }}
            >
              <span />
            </div>
            <div style={{display:"flex",justifyContent:"flex-end", gap:"15px"}}>
              <span
                className={`camera-status ${
                  cam.serial_number ? "active" : "inactive"
                }`}
              >
                {cam.serial_number ? "Active" : "Inactive"}
              </span>

              <span
                className={`camera-status ${isRunning ? "running" : "notrunning"}`}
              >
                {isRunning ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CameraCardsGrid;
