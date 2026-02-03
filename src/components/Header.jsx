import React, { useState } from "react";
import { Camera } from "lucide-react";

const Header = ({
  toggleTheme,
  theme,
  mode,
  setMode,
  handleInitialize,
  handleReInitialize,
  initialized,
  capture,
  loading,
}) => {

  const Initialized = localStorage.getItem("initialized");

  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          gap: " var(--space-sm)",
          color: "var(--color-primary)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "52px",
            height: "52px",
            borderRadius: "var(--radius-md)",
            padding: "9px",
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
          <Camera size={50} color="var(--color-primary)" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "22px", fontWeight: "700" }}>
            AI/ML Data Collection Platform{" "}
          </span>
          <span
            style={{
              color: "var(--color-text-muted)",
              fontWeight: "500",
              fontSize: "13px",
            }}
          >
            Multi-camera data capture systemfor field engineers{" "}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      
               {mode === "SOFTWARE" && (
                <button
                  className="initialize-btn"
                  onClick={capture}
                  disabled={loading}
                >
                  {loading ? "Capturing..." : "Capture"}
                </button>
              )}

              {mode === "HARDWARE" && (
                <p className="hardware-msg">
                  Hardware Trigger Enabled - Cameras capture on external signal
                </p>
              )}
              
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

export default Header;
