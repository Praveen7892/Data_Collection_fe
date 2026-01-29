const API_BASE = "http://127.0.0.1:5000";
const CAPTURE = "capture";
const CAMERA = "camera";

export const capture = async (data) => {
  console.log(data);
  const payload = data;
  try {
    const res = await fetch(`${API_BASE}/${CAPTURE}/click_capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to capture thr image");

    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const getCaptureImages = async () => {
  try {
    const res = await fetch(`${API_BASE}/${CAPTURE}/get_captured_images`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to get Captured images");

    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const getCameras = async () => {
  try {
    const res = await fetch(`${API_BASE}/${CAMERA}/get_all_cameras`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to get cameras");

    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const Initialization = async (data) => {
  const payload = data;

  try {
    const res = await fetch(`${API_BASE}/${CAMERA}/initialization`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to initialization");

    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};
