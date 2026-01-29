import { useEffect, useState } from "react";
import {
  capture as captureAPI,
  getCaptureImages,
  getCameras,
  Initialization,
} from "../services/services";

const useDataCollection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [cameras, setCameras] = useState(null);

  const [activeCamera, setActiveCamera] = useState(null);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [mode, setMode] = useState("SOFTWARE");
  const [initialized, setInitialized] = useState(false);

  const getAllCameras = async () => {
    try {
      const res = await getCameras();
      console.log(res);
      setCameras(res.response);

    } catch (e) {
      return e;
    }
  };

  const capture = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await captureAPI({ capture: true });
      const captureData = await getCaptureImages();

      setData({
        message: captureData.message ?? "captured",
        response: captureData.response ?? { captured_images: [] },
        status_code: captureData.status_code ?? 200,
      });
    } catch (err) {
      console.error("Error happened:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCameraSelection = (camera) => {
    setSelectedCameras((prev) => {
      const exists = prev.find((c) => c.id === camera.id);
      if (exists) {
        return prev.filter((c) => c.id !== camera.id);
      }
      return [...prev, { ...camera, aoi: null }];
    });
  };

  const handleCardClick = (camera) => {
    const selectedCam = selectedCameras.find((c) => c.id === camera.id);

    if (!selectedCam) {
      setActiveCamera({ ...camera, aoi: null });
    } else {
      setActiveCamera({ ...selectedCam });
    }
  };

  const handleInitialize = async () => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        mode,
        cameras: selectedCameras.map((cam) => ({
          id: cam.id,
          serial_number: cam.serial_number,
          aoi: cam.aoi,
        })),
      };

      console.log("Initialize payload:", payload);

      await Initialization(payload);

      setInitialized(true);
      localStorage.setItem("initialized", true);
    } catch (err) {
      console.error("Initialization error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReInitialize = () => {
    console.log(selectedCameras, "::::::::::::::: selectedCameras ");
    console.log(mode, "::::::::::::::: mode ");
    setInitialized(false);
    // localStorage.setItem("initialized", false);
    localStorage.removeItem("initialized");

  };

  useEffect(() => {
    if (!Array.isArray(selectedCameras)) {
      console.error("selectedCameras corrupted:", selectedCameras);
    }
  }, [selectedCameras]);

  useEffect(() => {
    getAllCameras();
  }, []);

  useEffect(() => {
    console.log(
      "selectedCameras:",
      selectedCameras,
      "isArray:",
      Array.isArray(selectedCameras),
    );
  }, [selectedCameras]);

  return {
    capture,
    loading,
    error,
    response,
    data,
    cameras,
    selectedCameras,
    activeCamera,
    mode,
    initialized,
    setMode,
    toggleCameraSelection,
    setSelectedCameras,
    setActiveCamera,
    handleCardClick,
    handleInitialize,
    handleReInitialize,
    setInitialized,
  };
};

export default useDataCollection;
