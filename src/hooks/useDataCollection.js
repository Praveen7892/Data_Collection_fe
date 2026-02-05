import { useEffect, useState } from "react";
import {
  capture as captureAPI,
  getCaptureImages,
  getCameras,
  Initialization,
  getRunningCameras,
} from "../services/services";

const useDataCollection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [cameras, setCameras] = useState(null);
  const [runningCameras, setRunningCameras] = useState(null);

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

  const getAllRunningCameras = async () => {
    try {
      const res = await getRunningCameras();
      console.log(res);
      // setRunningCameras(res.response);
      setRunningCameras((prev) => ({
        ...prev,
        ...res.response,
      }));
    } catch (e) {
      return e;
    }
  };

  const capture = async () => {
    setLoading(true);
    setError(null);

    try {
      await captureAPI({ capture: true });
      const captureData = await getCaptureImages();

      const formatted = {
        message: captureData.message ?? "captured",
        response: captureData.response ?? { captured_images: [] },
        status_code: captureData.status_code ?? 200,
      };

      setData(formatted);
      localStorage.setItem("lastCapture", JSON.stringify(formatted));
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
      // return [...prev, { ...camera, aoi: null }];
      return [...prev, { ...camera }];
    });
  };

  const handleCardClick = (camera) => {
    const selectedCam = selectedCameras.find((c) => c.id === camera.id);

    if (!selectedCam) {
      setActiveCamera({ ...camera });
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
        cameras: selectedCameras.map((cam) => {
          const defaultAOI = {
            Height: cam.height,
            Width: cam.width,
            OffsetX: cam.offset_x ?? cam.offset_x,
            OffsetY: cam.offset_y ?? cam.offset_y,
            TriggerMode: cam.trigger_mode ?? cam.trigger_mode,
            exposure_time_us: cam.exposure_time_us ?? cam.exposure_time_us,
          };

          return {
            id: cam.id,
            serial_number: cam.serial_number,
            aoi: cam.aoi
              ? {
                  Height: cam.aoi.height,
                  Width: cam.aoi.width,
                  OffsetX: cam.aoi.offsetX,
                  OffsetY: cam.aoi.offsetY,
                  TriggerMode: cam.aoi.trigger_mode,
                  exposure_time_us: cam.exposure_time_us,
                }
              : defaultAOI,
          };
        }),
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
      getAllCameras();
      getAllRunningCameras();
    }
  };

  //   const handleSaveAOI = (cameraId, aoi) => {
  //   setSelectedCameras(prev => {
  //     const safePrev = Array.isArray(prev) ? prev : [];
  //     const exists = safePrev.find(cam => cam.id === cameraId);

  //     if (!exists) {
  //       const cam = cameras.find(c => c.id === cameraId);
  //       return [...safePrev, { ...cam, aoi }];
  //     }

  //     return safePrev.map(cam =>
  //       cam.id === cameraId ? { ...cam, aoi } : cam
  //     );
  //   });

  //   setActiveCamera(prev =>
  //     prev?.id === cameraId ? { ...prev, aoi } : prev
  //   );
  // };

  const handleSaveAOI = (cameraId, aoi) => {
    setSelectedCameras((prev) => {
      if (!Array.isArray(prev)) return prev;

      if (!prev.some((cam) => cam.id === cameraId)) {
        return prev;
      }

      return prev.map((cam) => (cam.id === cameraId ? { ...cam, aoi } : cam));
    });

    setActiveCamera((prev) =>
      prev?.id === cameraId ? { ...prev, aoi } : prev,
    );
  };

  const handleReInitialize = () => {
    setInitialized(false);
    setSelectedCameras([]);
    setActiveCamera(null);
    setData(null);

    getAllCameras();
    getAllRunningCameras();

    localStorage.removeItem("initialized");
    localStorage.removeItem("selectedCameras");
    localStorage.removeItem("lastCapture");
  };

  useEffect(() => {
    if (!Array.isArray(selectedCameras)) {
      console.error("selectedCameras corrupted:", selectedCameras);
    }
  }, [selectedCameras]);

  useEffect(() => {
    getAllCameras();
    getAllRunningCameras();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCameras", JSON.stringify(selectedCameras));
  }, [selectedCameras]);

  useEffect(() => {
    const savedInit = localStorage.getItem("initialized");
    const savedCameras = localStorage.getItem("selectedCameras");
    const savedCapture = localStorage.getItem("lastCapture");

    if (savedInit === "true") {
      setInitialized(true);
    }

    if (savedCameras) {
      try {
        setSelectedCameras(JSON.parse(savedCameras));
      } catch (e) {
        console.error("Failed to parse selectedCameras");
      }
    }

    if (savedCapture) {
      try {
        setData(JSON.parse(savedCapture));
      } catch (e) {
        console.error("Failed to parse lastCapture");
      }
    }
  }, []);

  return {
    loading,
    error,
    response,
    data,
    cameras,
    runningCameras,
    selectedCameras,
    activeCamera,
    mode,
    initialized,
    capture,
    setMode,
    toggleCameraSelection,
    setSelectedCameras,
    setActiveCamera,
    handleCardClick,
    handleInitialize,
    handleReInitialize,
    setInitialized,

    handleSaveAOI,
  };
};

export default useDataCollection;
