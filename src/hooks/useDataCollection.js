import { useState } from "react";
import { capture as captureAPI, getCaptureImages } from "../services/services";

const useDataCollection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);

// const capture = async () => {
//   setLoading(true);
//   setError(null);

//  try {
//   console.log("Calling capture API...");
//   const res = await captureAPI({ capture: true });
//   console.log("Capture API success:", res);

//   console.log("Calling getCaptureImages...");
//   const data = await getCaptureImages();
//   console.log("Images received:", data);

//   setData(data);
// } catch (err) {
//   console.error("Error happened:", err);
// }finally {
//     setLoading(false);
//   }
// };


const capture = async () => {
  setLoading(true);
  setError(null);

  try {
    console.log("Calling capture API...");
    const res = await captureAPI({ capture: true });
    console.log("Capture API success:", res);

    console.log("Calling getCaptureImages...");
    const captureData = await getCaptureImages();
    console.log("Images received:", captureData);

    // Make sure the structure is consistent
    setData({
      message: captureData.message ?? "captured",
      response: captureData.response ?? { captured_images: [] },
      status_code: captureData.status_code ?? 200
    });
  } catch (err) {
    console.error("Error happened:", err);
    setError(err);
  } finally {
    setLoading(false);
  }
};


  return {
    capture,
    loading,
    error,
    response,
    data
  };
};

export default useDataCollection;
