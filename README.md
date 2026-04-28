# Lung Disease Detection System

This project is a machine learning pipeline and web API for detecting lung diseases from X-ray images. It uses a deep learning model to classify images into four categories: Normal, Pneumonia, Tuberculosis, and COVID.

## Project Structure

- `app.py`: A Flask backend API that loads the trained model and serves predictions.
- `heavy model.ipynb`: A Jupyter Notebook containing the training, evaluation, and experimentation code for the deep learning models.
- `lung_outputs/`: Directory for storing trained models (e.g., `.keras` files).
- `uploads/`: Temporary directory where uploaded images are saved for inference.
- `LungXRays-grayscale/`: Directory for the dataset (if applicable).

## API Endpoints

### 1. Health Check
`GET /health`
Checks if the API is running and whether the machine learning model has been loaded successfully.

**Response Example:**
```json
{
  "model_loaded": true,
  "model_path": "D:\\MAJOR PROJECT\\lung_outputs\\best_model.keras",
  "status": "running"
}
```

### 2. Predict Image
`POST /predict`
Accepts an image file and returns the classification result.

**Request:**
- **Content-Type**: `multipart/form-data`
- **Body**: A file upload field named `file` (Supports `.jpg`, `.jpeg`, `.png`).

**Response Example:**
```json
{
  "class_index": 1,
  "prediction": "Pneumonia",
  "probabilities": {
    "COVID": 0.005,
    "Normal": 0.015,
    "Pneumonia": 0.970,
    "Tuberculosis": 0.010
  }
}
```

## Setup & Installation

1. **Activate the virtual environment**:
   ```bash
   # Windows
   .venv\Scripts\activate
   # Linux/macOS
   source .venv/bin/activate
   ```

2. **Install Required Packages**:
   Ensure you have the required dependencies. You can install them manually or via a `requirements.txt` if available:
   ```bash
   pip install flask flask-cors werkzeug numpy tensorflow pillow
   ```

3. **Run the Server**:
   ```bash
   python app.py
   ```
   The Flask server will start locally on port `5000`.

## Model Information
The API expects the model to be located at `D:\MAJOR PROJECT\lung_outputs\best_model.keras` by default (configurable in `app.py`). The model processes input images by resizing them to 224x224 pixels and scaling pixel values to `[0, 1]` before prediction.
