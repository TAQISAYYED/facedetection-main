// import React, { useRef, usEffect, useState } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const LiveCamera = () => {
//   const webcamRef = useRef(null);
//   const [processedImg, setProcessedImg] = useState(null);

//   // Capture frame and send to FastAPI every 200ms
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       if (!webcamRef.current) return;

//       // Capture webcam image as base64
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (!imageSrc) return;

//       try {
//         // Convert base64 to blob
//         const blob = await (await fetch(imageSrc)).blob();
//         const formData = new FormData();
//         formData.append("file", blob, "frame.jpg");

//         // Send to FastAPI backend
//         const response = await axios.post("http://127.0.0.1:8000/detect-image", formData, {
//           responseType: "blob", // important to get image data
//         });

//         // Convert response blob to URL for display
//         const url = URL.createObjectURL(response.data);
//         setProcessedImg(url);
//       } catch (err) {
//         console.error(err);
//       }
//     }, 200); // every 200ms (~5 FPS)

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <h2>Live Webcam YOLOv8 Detection</h2>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
//         style={{ border: "2px solid black" }}
//       />
//       <h3>Processed Output:</h3>
//       {processedImg && (
//         <img
//           src={processedImg}
//           alt="Processed frame"
//           style={{ border: "2px solid red", marginTop: "10px" }}
//         />
//       )}
//     </div>
//   );
// };

// export default LiveCamera;


// import React, { useRef, useEffect, useState } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const LiveCamera = () => {
//   const webcamRef = useRef(null);
//   const [processedImg, setProcessedImg] = useState(null);

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       if (!webcamRef.current) return;

//       const imageSrc = webcamRef.current.getScreenshot();
//       if (!imageSrc) return;

//       try {
//         const blob = await (await fetch(imageSrc)).blob();
//         const formData = new FormData();
//         formData.append("file", blob, "frame.jpg");

//         const response = await axios.post(
//           "http://127.0.0.1:8000/detect-image",
//           formData,
//           { responseType: "blob" }
//         );

//         const url = URL.createObjectURL(response.data);
//         setProcessedImg(url);
//       } catch (err) {
//         console.error(err);
//       }
//     }, 200);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <h2>Live Webcam YOLOv8 Detection</h2>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
//         style={{ border: "2px solid black" }}
//       />
//       <h3>Processed Output:</h3>
//       {processedImg && (
//         <img
//           src={processedImg}
//           alt="Processed frame"
//           style={{ border: "2px solid red", marginTop: "10px" }}
//         />
//       )}
//     </div>
//   );
// };

// export default LiveCamera;

import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./LiveCamera.css"; // Import the new CSS

const LiveCamera = () => {
  const webcamRef = useRef(null);
  const [processedImg, setProcessedImg] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!webcamRef.current) return;

      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      try {
        const blob = await (await fetch(imageSrc)).blob();
        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");

        const response = await axios.post(
          "http://127.0.0.1:8000/detect-image",
          formData,
          { responseType: "blob" }
        );

        const url = URL.createObjectURL(response.data);
        setProcessedImg(url);
      } catch (err) {
        console.error(err);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-camera-card">
      <h2 className="live-camera-title">Live Webcam YOLOv8 Detection</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        className="webcam-frame"
      />
      <h3 className="processed-title">Processed Output:</h3>
      {processedImg && (
        <img
          src={processedImg}
          alt="Processed frame"
          className="processed-frame"
        />
      )}
    </div>
  );
};

export default LiveCamera;
