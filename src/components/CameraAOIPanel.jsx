import { useEffect, useState } from "react";
import "./camera.css";

const CameraAOIPanel = ({ camera, onClose, onSaveAOI }) => {
  const DEFAULT_AOI = {
    height: camera.height,
    width: camera.width,
    offsetX: camera.offset_x,
    offsetY: camera.offset_y,
  };

  const [aoi, setAoi] = useState(DEFAULT_AOI);

  useEffect(() => {
    if (camera) {
      setAoi(camera.aoi || DEFAULT_AOI);
    }
  }, [camera]);

  if (!camera) return null;

  return (
    <aside className="aoi-panel open">
      <header className="aoi-header">
        <h3>{camera.serial_number} - AOI Settings</h3>
        <button className="icon-btn" onClick={onClose}>
          ✕
        </button>
      </header>

      <section className="aoi-controls">
        <div className="aoi-field">
          <label>Height</label>
          <input
            type="range"
            max={2160}
            value={aoi.height}
            onChange={(e) => setAoi({ ...aoi, height: +e.target.value })}
          />
          <span>{aoi.height}px</span>
        </div>

        <div className="aoi-field">
          <label>Width</label>
          <input
            type="range"
            max={3840}
            value={aoi.width}
            onChange={(e) => setAoi({ ...aoi, width: +e.target.value })}
          />
          <span>{aoi.width}px</span>
        </div>

        <div className="aoi-field">
          <label>Offset X</label>
          <input
            type="number"
            value={aoi.offsetX}
            onChange={(e) => setAoi({ ...aoi, offsetX: +e.target.value })}
          />
        </div>

        <div className="aoi-field">
          <label>Offset Y</label>
          <input
            type="number"
            value={aoi.offsetY}
            onChange={(e) => setAoi({ ...aoi, offsetY: +e.target.value })}
          />
        </div>
      </section>

      <footer className="aoi-footer">
        <button className="save-aoi-btn" onClick={() => onSaveAOI(aoi)}>
          Save AOI
        </button>
      </footer>
    </aside>
  );
};

export default CameraAOIPanel;
