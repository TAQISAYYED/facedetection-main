import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const LiveCamera = () => {
  const webcamRef = useRef(null);
  const [processedImg, setProcessedImg] = useState(null);

  // Capture frame and send to FastAPI every 200ms
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!webcamRef.current) return;

      // Capture webcam image as base64
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      try {
        // Convert base64 to blob
        const blob = await (await fetch(imageSrc)).blob();
        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");

        // Send to FastAPI
        const response = await axios.post("http://127.0.0.1:8000/detect-image", formData, {
          responseType: "blob", // important
        });

        // Convert response blob to URL for display
        const url = URL.createObjectURL(response.data);
        setProcessedImg(url);
      } catch (err) {
        console.error(err);
      }
    }, 200); // every 200ms (5 FPS)
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Live Webcam YOLOv8 Detection</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        style={{ border: "2px solid black" }}
      />
      <h3>Processed Output:</h3>
      {processedImg && <img src={processedImg} alt="Processed frame" style={{ border: "2px solid red" }} />}
    </div>
  );
};

export default LiveCamera;
