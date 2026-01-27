import React, { useState, useRef, useMemo } from "react";
import { FaCamera } from "react-icons/fa";
import { MdCameraAlt } from "react-icons/md";
import { Camera } from "lucide-react";
import { FiSettings } from "react-icons/fi";
import { MdSettings } from "react-icons/md"; 
import { IoSettingsOutline } from "react-icons/io5"; 
import { FaSlidersH } from "react-icons/fa"; 
import useDataCollection from "../hooks/useDataCollection";



const DataCollection = ({ toggleTheme, theme }) => {

 const { data, capture, loading, error } = useDataCollection();

const MAX_CAMERAS = 6;

console.log("captured_images:", data?.response?.captured_images);
const images = useMemo(() => {
  return Array.from({ length: MAX_CAMERAS }, (_, i) => {
    const url = data?.response?.captured_images?.[i] ?? null;
    return {
      id: i,
      name: `Camera ${i + 1}`,
      src: url,
      status: url ? "active" : "inactive",
    };
  });
}, [data]);

  console.log(images, "images");


  return (
    <div className="page">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <div className="page-content">
        <div className="page-content-left">
          {" "}
          {/* <div className="camera-grid">
            {images.map((image, i) => (
              <CameraCard key={i} {...image} />
            ))}
          </div> */}

          <div className="camera-grid">
  {images.map((image) => (
    <CameraCard key={image.id} {...image} />
  ))}
</div>



        </div>
        <div className="page-content-right">
          {" "}
          <Configuration 
               capture={capture}
            loading={loading}
            error={error}
            />
        </div>
      </div>
    </div>
  );
};

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          gap: " var(--space-md)",
          color: "var(--color-primary)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60px",
            height: "60px",
            borderRadius: "var(--radius-lg)",
            padding: "12px",
            background: "linear-gradient(145deg, #ffffff10, #00000010)",
            border: "2px solid var(--color-primary)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition:
              "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
          }}
        >
          <Camera size={60} color="var(--color-primary)" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "26px", fontWeight: "700" }}>
            AI/ML Data Collection Platform{" "}
          </span>
          <span
            style={{
              color: "var(--color-text-muted)",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Multi-camera data capture systemfor field engineers{" "}
          </span>
        </div>
      </div>
      <div>
        {/* <button onClick={toggleTheme}> {theme === "dark" ? "🌙 Dark" : "☀️ Light"}</button> */}
        <button
          className={`theme-switch ${theme}`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <span className="switch-track">
            <span className="switch-thumb" />
          </span>
          <span className="switch-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
        </button>
      </div>
    </header>
  );
};

const Configuration = ({ capture, loading, error }) => {
  const [path, setPath] = useState("");
  const dirInputRef = useRef(null);

    // const { capture, loading, error } = useDataCollection();

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

  const [mode, setMode] = useState("software");

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

      <div className="toggle-buttons">
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
      </div>

      <div>
        {/* {mode === "software" && <button className="path-selector-browse-btn">Capture</button>} */}
        {mode === "software" && (
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
        )}
      </div>
    </div>
  );
};

// const CameraCard = ({ name, status = "active" }) => {

//   return (
//     <div className="camera-card">
//       <div className="camera-preview">
//         <Camera size={50} className="camera-icon" />
//         {/* {data.

//         } */}
//       </div>

//       <div className="camera-footer">
//         <span className="camera-name">{name}</span>

//         <span
//           className={`camera-status ${
//             status === "active" ? "active" : "inactive"
//           }`}
//         >
//           {status === "active" ? "Active" : "Inactive"}
//         </span>
//       </div>
//     </div>
//   );
// };


const CameraCard = ({ name, status = "active", src }) => {
  return (
    <div className="camera-card">
      <div className="camera-preview">
        {src ? (
          <img
            src={src}
            alt={src}
            className="camera-image"
          />
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
