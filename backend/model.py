from ultralytics import YOLO
import matplotlib.pyplot as plt
import cv2

# Load your trained or pretrained model
model = YOLO("yolov8m.pt")  # will auto-download if not present

# Path to local test image
fn = "img.jpg"  # replace with your image file path

# Run prediction
results = model.predict(source=fn, conf=0.5)

# Convert the first result image to RGB for matplotlib
img = cv2.cvtColor(results[0].plot(), cv2.COLOR_BGR2RGB)

# Display the image
plt.figure(figsize=(8,8))
plt.imshow(img)
plt.axis('off')
plt.title(fn)
plt.show()
