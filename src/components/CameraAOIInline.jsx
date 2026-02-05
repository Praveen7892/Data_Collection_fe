import { useState } from "react";

const CameraAOIInline = ({ camera, onSave }) => {
  console.log(camera, ":::::::::::: CAMERA :::::::::::::");
  const [aoi, setAoi] = useState({
    height: camera.aoi?.height ?? camera.height,
    width: camera.aoi?.width ?? camera.width,
    offsetX: camera.aoi?.offset_x ?? camera.offset_x,
    offsetY: camera.aoi?.offset_y ?? camera.offset_y,
    trigger_mode: camera.aoi?.trigger_mode ?? camera.trigger_mode,
    exposure_time_us: camera.aoi?.exposure_time_us ?? camera.exposure_time_us,
  });


  return (
    <div className="camera-aoi" onClick={(e) => e.stopPropagation()}>
      <div className="aoi-field">
        <label>Height</label>
        <input
          type="range"
          max={2160}
          step={2}
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
          step={2}
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

      <div className="aoi-field">
        <label>Tigger Mode</label>
        <select
          value={aoi.trigger_mode}
          onChange={(e) => setAoi({ ...aoi, trigger_mode: e.target.value })}
        >
          <option value="Off">Off</option>
          <option value="On">On</option>
        </select>
      </div>

      <div className="aoi-field">
        <label>Exposure Time</label>
        <input
          type="number"
          value={aoi.exposure_time_us}
          onChange={(e) => setAoi({ ...aoi, exposure_time_us: +e.target.value })}
        />
      </div>


      <button className="save-aoi-btn" onClick={() => onSave(aoi)}>
        Save AOI
      </button>
    </div>
  );
};

export default CameraAOIInline;
