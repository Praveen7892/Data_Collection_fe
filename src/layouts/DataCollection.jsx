import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { MdCameraAlt } from "react-icons/md";
import { Camera } from "lucide-react";
import { FiSettings } from "react-icons/fi";

import { MdSettings } from "react-icons/md"; // Material
import { IoSettingsOutline } from "react-icons/io5"; // iOS-style
import { FaSlidersH } from "react-icons/fa"; // Sliders

const DataCollection = ({ toggleTheme }) => {
  const cameras = [
    { name: "Camera 1", status: "active" },
    { name: "Camera 2", status: "active" },
    { name: "Camera 3", status: "active" },
    { name: "Camera 4", status: "active" },
    { name: "Camera 5", status: "active" },
    { name: "Camera 6", status: "inactive" },
  ];

  return (
    <div className="page">
      <Header toggleTheme={toggleTheme} />
      <div className="page-content">
        <div className="page-content-left">
          {" "}
          <div className="camera-grid">
            {cameras.map((cam, i) => (
              <CameraCard key={i} {...cam} />
            ))}
          </div>
        </div>
        <div className="page-content-right">
          {" "}
          <Configuration />
        </div>
      </div>
    </div>
  );
};

const Header = ({ toggleTheme }) => {
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
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </header>
  );
};

const Configuration = () => {
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

  const [mode, setMode] = useState("software");

  return (
    <div className="configuration">
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "20px",
          color:"var(--color-primary)",
        }}
      >
        <MdSettings size={23} />
        Configuration
      </h2>

      <div className="path-selector">
        <input
          type="text"
          value={path}
          readOnly
          placeholder="Select folder..."
          className="input-file-path"

        />

        <button onClick={handleBrowse}>Browse</button>

        <input
          type="file"
          ref={dirInputRef}
          style={{ display: "none" }}
          webkitdirectory="true"
          onChange={handleDirectoryChange}
        />
      </div>

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
        {mode === "software" && <button >Capture</button>}

        {mode === "hardware" && <button>Hardware Action</button>}
      </div>
    </div>
  );
};

const CameraCard = ({ name, status = "active" }) => {
  return (
    <div className="camera-card">
      <div className="camera-preview">
        <Camera size={50} className="camera-icon" />
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
