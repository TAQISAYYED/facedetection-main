

// import React, { useState } from "react";
// import { BrowserRouter } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
// import LiveCamera from "./LiveCamera";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [processedImg, setProcessedImg] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//     setProcessedImg(null);
//   };

//   const handleDetectFace = async () => {
//     if (!selectedFile) {
//       alert("Please select an image first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/detect-image",
//         formData,
//         { responseType: "blob" }
//       );

//       const url = URL.createObjectURL(response.data);
//       setProcessedImg(url);
//     } catch (err) {
//       console.error(err);
//       alert("Error detecting face. Check backend server.");
//     }
//   };

//   return (
//     <BrowserRouter>
//       <div className="app flex flex-col min-h-screen bg-gray-50">

//         {/* Navbar */}
//         <Navbar />

//         {/* Main Content */}
//         <main className="flex-grow px-6 py-12 max-w-7xl mx-auto">

//           {/* Hero Section */}
//           <section className="hero text-center mb-16">
//             <h1 className="text-5xl font-bold mb-4 text-gray-800">
//               Face Detection System
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Detect faces in uploaded images and live webcam feed using AI-powered YOLO detection.
//             </p>
//           </section>

//           {/* Face Detection Section */}
//           <section className="face-detection grid grid-cols-1 gap-10 items-start mb-20">


//             {/* Upload Image Section */}
//             <div className="upload-section bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center">
//               <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Image</h2>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="border border-gray-300 p-2 rounded w-full mb-6"
//               />
//               <button
//                 onClick={handleDetectFace}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded transition-colors duration-300"
//               >
//                 Detect Face
//               </button>

//               {processedImg && (
//                 <div className="mt-6 w-full text-center">
//                   <h3 className="text-lg font-medium mb-2 text-gray-700">Processed Image</h3>
//                   <img
//                     src={processedImg}
//                     alt="Processed"
//                     className="border-2 border-red-500 rounded max-w-full"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Live Camera Section */}
//             <div className="live-camera-section bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center">
//               <h2 className="text-2xl font-semibold mb-6 text-gray-800">Live Camera Detection</h2>
//               <LiveCamera />
//             </div>

//           </section>

//         </main>

//         {/* Footer */}
//         <Footer />

//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LiveCamera from "./LiveCamera";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImg, setProcessedImg] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setProcessedImg(null);
  };

  const handleDetectFace = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/detect-image",
        formData,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(response.data);
      setProcessedImg(url);
    } catch (err) {
      console.error(err);
      alert("Error detecting face. Check backend server.");
    }
  };

  return (
    <BrowserRouter>
      <div className="app flex flex-col min-h-screen bg-gray-50">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow px-6 py-12 max-w-7xl mx-auto">

          {/* Hero Section */}
          <section className="hero text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">
              Face Detection System
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Detect faces in uploaded images and live webcam feed using AI-powered YOLO detection.
            </p>
          </section>

          {/* Face Detection Section (2 cols side by side) */}
          <section className="face-detection grid md:grid-cols-2 gap-10 items-start mb-20">

            {/* Upload Image Section */}
            <div className="upload-section bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Upload Image
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded w-full mb-6"
              />

              <button
                onClick={handleDetectFace}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded transition-colors duration-300"
              >
                Detect Face
              </button>

              {processedImg && (
                <div className="mt-6 w-full text-center">
                  <h3 className="text-lg font-medium mb-2 text-gray-700">
                    Processed Image
                  </h3>
                  <img
                    src={processedImg}
                    alt="Processed"
                    className="border-2 border-red-500 rounded max-w-full mx-auto"
                  />
                </div>
              )}
            </div>

            {/* Live Camera Section */}
            <div className="live-camera-section bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Live Camera Detection
              </h2>

              {/* Fallback if webcam not available */}
              {window?.navigator?.mediaDevices ? (
                <LiveCamera />
              ) : (
                <p className="text-gray-500">Webcam not available</p>
              )}
            </div>

          </section>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
