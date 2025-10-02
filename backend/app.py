# uvicorn app:app --reload --host 0.0.0.0 --port 8000

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from ultralytics import YOLO
import cv2
import numpy as np
import io

app = FastAPI(title="YOLOv8 Face Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv8 model (pretrained or your custom trained)
model = YOLO("best.pt")  # auto-download if not present

# Utility to convert image to JPEG bytes
def image_to_bytes(img):
    _, buffer = cv2.imencode(".jpg", img)
    return io.BytesIO(buffer)

# Endpoint to upload a single image and get result
@app.post("/detect-image")
async def detect_image(file: UploadFile = File(...)):
    # Read uploaded file
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run YOLOv8 prediction
    results = model.predict(source=img, conf=0.5)
    output_img = results[0].plot()  # Draw bounding boxes

    # Return processed image as JPEG
    return StreamingResponse(image_to_bytes(output_img), media_type="image/jpeg")


# Endpoint to stream live video frames from client
@app.post("/detect-video")
async def detect_video(file: UploadFile = File(...)):
    # Read uploaded video file
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    video = cv2.VideoCapture(cv2.imdecode(nparr, cv2.IMREAD_COLOR))

    # This is just for example: returning first frame with detections
    ret, frame = video.read()
    if not ret:
        return {"error": "Cannot read video"}

    results = model.predict(source=frame, conf=0.5)
    output_frame = results[0].plot()

    return StreamingResponse(image_to_bytes(output_frame), media_type="image/jpeg")
