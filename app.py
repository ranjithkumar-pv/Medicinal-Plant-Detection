import io
import numpy as np
from flask import Flask, request, jsonify, render_template, url_for
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
from plant_data import CLASS_NAMES, PLANT_DETAILS  # mapping file

app = Flask(__name__)

# --- Model ---
MODEL_PATH = "Model_Mobilenet.h5"
model = load_model(MODEL_PATH)
IMAGE_SIZE = (224, 224)

# --- Prediction ---
def predict_plant(img: Image.Image):
    img = img.resize(IMAGE_SIZE)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    predictions = model.predict(img_array)
    class_idx = np.argmax(predictions[0])
    plant_name = CLASS_NAMES[class_idx]
    return plant_name

# --- Routes ---
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["image"]
    try:
        img = Image.open(io.BytesIO(file.read())).convert("RGB")
    except:
        return jsonify({"error": "Invalid image"}), 400

    plant_name = predict_plant(img)

    # Use static/plant_img
    image_url = url_for("static", filename=f"{plant_name}.jpg")

    return jsonify({
        "plant": plant_name,
        "image_url": image_url
    })

@app.route("/details", methods=["GET"])
def details():
    plant_name = request.args.get("name")
    if not plant_name:
        return jsonify({"error": "Plant name missing"}), 400
    details = PLANT_DETAILS.get(plant_name, {})
    return jsonify({
        "plant": plant_name,
        "scientific_name": details.get("scientific_name", "N/A"),
        "usage": details.get("medicinal_usage", "N/A")
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
