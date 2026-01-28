// import { useEffect, useState } from "react";
// import "./camera.css";

// const CameraAOIPanel = ({ camera, onClose }) => {
//   const [aoi, setAoi] = useState({
//     height: 2160,
//     width: 2300,
//     offsetX: 200,
//     offsetY: 100
//   });

//   useEffect(() => {
//     if (camera) {
//       setAoi({
//         height: 2160,
//         width: 2300,
//         offsetX: 200,
//         offsetY: 100
//       });
//     }
//   }, [camera]);

//   return (
//     <div className={`aoi-panel ${camera ? "open" : ""}`}>
//       {camera && (
//         <>
//           <div className="aoi-header">
//             <h3>{camera.name}</h3>
//             <button onClick={onClose}>✕</button>
//           </div>

//           <div className="aoi-preview">
//             <div className="aoi-box" />
//           </div>

//           <div className="aoi-controls">
//             <label>
//               Height
//               <input
//                 type="range"
//                 value={aoi.height}
//                 max={2160}
//                 onChange={e => setAoi({ ...aoi, height: e.target.value })}
//               />
//               <span>{aoi.height}px</span>
//             </label>

//             <label>
//               Width
//               <input
//                 type="range"
//                 value={aoi.width}
//                 max={3840}
//                 onChange={e => setAoi({ ...aoi, width: e.target.value })}
//               />
//               <span>{aoi.width}px</span>
//             </label>

//             <label>
//               Offset X
//               <input
//                 type="number"
//                 value={aoi.offsetX}
//                 onChange={e => setAoi({ ...aoi, offsetX: e.target.value })}
//               />
//             </label>

//             <label>
//               Offset Y
//               <input
//                 type="number"
//                 value={aoi.offsetY}
//                 onChange={e => setAoi({ ...aoi, offsetY: e.target.value })}
//               />
//             </label>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CameraAOIPanel;



// import { useEffect, useState } from "react";
// import "./camera.css";

// const CameraAOIPanel = ({ camera, onClose, onSaveAOI }) => {
//   const [aoi, setAoi] = useState({
//     height: 2160,
//     width: 2300,
//     offsetX: 200,
//     offsetY: 100
//   });

//   useEffect(() => {
//     if (camera) {
//       setAoi(
//         camera.aoi || {
//           height: 2160,
//           width: 2300,
//           offsetX: 200,
//           offsetY: 100
//         }
//       );
//     }
//   }, [camera]);

//   if (!camera) return null;

//   return (
//     <div className="aoi-panel open">
//       <div className="aoi-header">
//         <h3>{camera.name}</h3>
//         <button onClick={onClose}>✕</button>
//       </div>

//       <div className="aoi-controls">
//         <label>
//           Height
//           <input
//             type="range"
//             max={2160}
//             value={aoi.height}
//             onChange={e => setAoi({ ...aoi, height: +e.target.value })}
//           />
//           <span>{aoi.height}px</span>
//         </label>

//         <label>
//           Width
//           <input
//             type="range"
//             max={3840}
//             value={aoi.width}
//             onChange={e => setAoi({ ...aoi, width: +e.target.value })}
//           />
//           <span>{aoi.width}px</span>
//         </label>

//         <label>
//           Offset X
//           <input
//             type="number"
//             value={aoi.offsetX}
//             onChange={e => setAoi({ ...aoi, offsetX: +e.target.value })}
//           />
//         </label>

//         <label>
//           Offset Y
//           <input
//             type="number"
//             value={aoi.offsetY}
//             onChange={e => setAoi({ ...aoi, offsetY: +e.target.value })}
//           />
//         </label>
//       </div>

//       <div className="aoi-footer">
//         <button
//           className="save-aoi-btn"
//           onClick={() => onSaveAOI(aoi)}
//         >
//           Save AOI
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CameraAOIPanel;




import { useEffect, useState } from "react";
import "./camera.css";

const DEFAULT_AOI = {
  height: 2160,
  width: 2300,
  offsetX: 200,
  offsetY: 100
};

const CameraAOIPanel = ({ camera, onClose, onSaveAOI }) => {
  const [aoi, setAoi] = useState(DEFAULT_AOI);

  useEffect(() => {
    if (camera) {
      setAoi(camera.aoi || DEFAULT_AOI);
    }
  }, [camera]);

  if (!camera) return null;

  return (
    <aside className="aoi-panel open">
      {/* Header */}
      <header className="aoi-header">
        <h3>{camera.serial_number} -  AOI Settings</h3>
        <button className="icon-btn" onClick={onClose}>✕</button>
      </header>

      {/* Controls */}
      <section className="aoi-controls">
        <div className="aoi-field">
          <label>Height</label>
          <input
            type="range"
            max={2160}
            value={aoi.height}
            onChange={e => setAoi({ ...aoi, height: +e.target.value })}
          />
          <span>{aoi.height}px</span>
        </div>

        <div className="aoi-field">
          <label>Width</label>
          <input
            type="range"
            max={3840}
            value={aoi.width}
            onChange={e => setAoi({ ...aoi, width: +e.target.value })}
          />
          <span>{aoi.width}px</span>
        </div>

        <div className="aoi-field">
          <label>Offset X</label>
          <input
            type="number"
            value={aoi.offsetX}
            onChange={e => setAoi({ ...aoi, offsetX: +e.target.value })}
          />
        </div>

        <div className="aoi-field">
          <label>Offset Y</label>
          <input
            type="number"
            value={aoi.offsetY}
            onChange={e => setAoi({ ...aoi, offsetY: +e.target.value })}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="aoi-footer">
        <button className="save-aoi-btn" onClick={() => onSaveAOI(aoi)}>
          Save AOI
        </button>
      </footer>
    </aside>
  );
};

export default CameraAOIPanel;
