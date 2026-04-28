# app.py
# Flask backend for Lung Disease Prediction + LIME + Severity + Chatbot

import os
import traceback
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS

import numpy as np
from PIL import Image

# LIME
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from lime import lime_image
from skimage.segmentation import mark_boundaries

# Keras model loader (H5 loader, NOT .keras)
from tensorflow.keras.models import load_model

# --------------------------
# Configuration
# --------------------------
MODEL_PATH = r"D:\MAJOR PROJECT\best_lung_model.h5"
UPLOAD_FOLDER = r"D:\MAJOR PROJECT\uploads"
ALLOWED_EXT = {".jpg", ".jpeg", ".png"}
IMG_SIZE = (224, 224)

app = Flask(__name__)
CORS(app)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# --------------------------
# Utility Functions
# --------------------------
def allowed_file(filename):
    return os.path.splitext(filename)[1].lower() in ALLOWED_EXT

def ensure_folder(path):
    os.makedirs(path, exist_ok=True)

def preprocess_image(path):
    img = Image.open(path)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img = img.resize(IMG_SIZE)
    arr = np.array(img) / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr

# --------------------------
# Load Model
# --------------------------
model = None
try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Model not found at: " + MODEL_PATH)

    model = load_model(MODEL_PATH)   # ← H5 LOADER (not .keras)
    print("Model loaded successfully.")

except Exception:
    print("Error loading model:")
    traceback.print_exc()
    model = None

# --------------------------
# Classes (your 4 classes)
# --------------------------
CLASS_NAMES = ["Normal", "Pneumonia", "Tuberculosis", "COVID"]

# --------------------------
# Severity Function
# --------------------------
def get_severity(label, prob):
    if label == "Normal":
        return "No severity"
    if prob >= 0.90:
        return "Severe"
    if prob >= 0.70:
        return "Moderate"
    return "Mild"

# --------------------------
# LIME Heatmap Generator
# --------------------------
def generate_lime(image_path, model, filename):
    img = Image.open(image_path).convert("RGB").resize(IMG_SIZE)
    img_arr = np.array(img) / 255.0

    explainer = lime_image.LimeImageExplainer()
    explanation = explainer.explain_instance(
        img_arr,
        model.predict,
        top_labels=1,
        hide_color=0,
        num_samples=500
    )

    top_label = explanation.top_labels[0]

    lime_img, mask = explanation.get_image_and_mask(
        top_label,
        positive_only=False,
        num_features=8,
        hide_rest=False
    )

    plt.figure(figsize=(6, 6))
    plt.imshow(mark_boundaries(lime_img, mask))
    plt.axis("off")

    base = os.path.splitext(filename)[0]
    lime_filename = f"lime_{base}.png"
    lime_path = os.path.join(UPLOAD_FOLDER, lime_filename)

    plt.savefig(lime_path, bbox_inches="tight", pad_inches=0)
    plt.close()

    explanation_text = (
        "Green regions increased model confidence, "
        "while red/other regions decreased it."
    )

    return lime_path, explanation_text

# --------------------------
# Route: Serve uploaded images
# --------------------------
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# --------------------------
# ROUTE: PREDICTION
# --------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        if "file" not in request.files:
            return jsonify({"error": "Send file using 'file' key"}), 400

        file = request.files["file"]
        filename = secure_filename(file.filename)

        if filename == "":
            return jsonify({"error": "Empty filename"}), 400

        if not allowed_file(filename):
            return jsonify({"error": "Invalid file type"}), 400

        ensure_folder(UPLOAD_FOLDER)
        filename = filename.replace(" ", "_")
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(save_path)

        img_arr = preprocess_image(save_path)
        preds = model.predict(img_arr)[0]

        idx = int(np.argmax(preds))
        label = CLASS_NAMES[idx]
        prob = float(preds[idx])

        severity = get_severity(label, prob)

        lime_path, lime_text = generate_lime(save_path, model, filename)
        lime_filename = os.path.basename(lime_path)

        return jsonify({
            "prediction": label,
            "severity": severity,
            "class_index": idx,
            "probabilities": {CLASS_NAMES[i]: float(preds[i]) for i in range(4)},
            "lime_image": lime_filename,
            "lime_explanation": lime_text
        })
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

# --------------------------
# ROUTE: CHATBOT
# --------------------------
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json() or {}
    msg = data.get("message", "")
    pred = data.get("prediction")
    sev = data.get("severity")
    lime = data.get("lime_image")

    text = msg.lower()

    if "prediction" in text:
        return jsonify({"response": f"Prediction is: {pred}"})

    if "severity" in text:
        return jsonify({"response": f"Severity is: {sev}"})

    if "heatmap" in text or "xai" in text:
        return jsonify({"response": f"LIME heatmap: http://127.0.0.1:5000/uploads/{lime}"})

    return jsonify({"response": "Ask me about prediction, severity or heatmap."})

# --------------------------
# Run server
# --------------------------
if __name__ == "__main__":
    ensure_folder(UPLOAD_FOLDER)
    print("Running Flask on port 5000…")
    app.run(host="0.0.0.0", port=5000, debug=False)
