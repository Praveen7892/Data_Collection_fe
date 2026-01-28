import React, { useMemo } from "react";
import { Camera } from "lucide-react";

const CapturePage = (data,) => {
  const MAX_CAMERAS = 6;


  console.log(data, "::::::::::::::::data")

    const images = useMemo(() => {
    return Array.from({ length: MAX_CAMERAS }, (_, i) => {
      const url = data?.data?.response?.captured_images?.[i] ?? null;
      return {
        id: i,
        name: `Camera ${i + 1}`,
        src: url,
        status: url ? "active" : "inactive",
      };
    });
  }, [data]);

  return (
    <div className="camera-layout">
      <div className="image-grid">
        {images?.map((image) => (
          <CameraCard key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
};

const CameraCard = ({ name, status = "active", src }) => {
  return (
    <div className="image-card">
      <div className="image-preview">
        {src ? (
          <img src={src} alt={src} className="image-image" />
        ) : (
          <Camera size={50} className="image-icon" />
        )}
      </div>

      <div className="image-footer">
        <span className="image-name">{name}</span>
        <span
          className={`image-status ${
            status === "active" ? "active" : "inactive"
          }`}
        >
          {status === "active" ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
};

export default CapturePage;
