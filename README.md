# Medicinal Plant Detection System

An advanced AI-powered web application for identifying medicinal plants using deep learning. Upload or capture an image of a plant, and the system will instantly recognize it and provide comprehensive information about its medicinal properties, scientific classification, and traditional uses.

## 🌿 Features

- **Real-time Plant Identification**: Upload or capture plant images for instant recognition
- **High Accuracy**: Built on MobileNet deep learning architecture trained on diverse plant datasets
- **Camera Integration**: Direct camera capture functionality for on-the-spot plant identification
- **Comprehensive Analysis**: View plant name, scientific classification, medicinal usage, and additional information
- **Report Generation**: Download detailed analysis reports in text format
- **Production-Grade UI/UX**: Modern, responsive design with smooth animations and intuitive navigation
- **Drag & Drop Support**: Easy image upload with drag-and-drop functionality
- **Scan Animation**: Professional scanning animation during plant identification
- **Cross-Platform**: Works on desktop, tablet, and mobile devices

## 🎯 System Architecture

```
┌─────────────────┐
│   Web Browser   │
│  (HTML/CSS/JS)  │
└────────┬────────┘
         │
    ┌────▼────────────┐
    │   Flask API     │
    │  (app.py)       │
    └────┬────────────┘
         │
    ┌────▼────────────┐
    │  TensorFlow     │
    │  MobileNet.h5   │
    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- pip (Python package manager)
- Modern web browser with camera support (for camera feature)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Medicinal-Plant-Detection.git
   cd Medicinal-Plant-Detection
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

```bash
python app.py
```

## 📁 Project Structure

```
Medicinal-Plant-Detection/
├── app.py                          # Flask application server
├── plant_data.py                   # Plant database & classification mappings
├── Model_Mobilenet.h5             # Pre-trained deep learning model
├── requirements.txt               # Python dependencies
├── runtime.txt                    # Python runtime version
├── procfile                       # Deployment configuration
├── README.md                      # This file
├── LICENSE                        # Project license
├── templates/
│   ├── index.html                # Main UI interface
│   ├── script.js                 # Frontend JavaScript logic
│   └── style.css                 # UI styling & animations
├── static/
│   └── plant_images/             # Plant reference images
├── backend/
│   ├── model/
│   │   ├── Data Collection.ipynb # Dataset collection notebook
│   │   └── model_train.ipynb     # Model training notebook
│   └── requirements.txt.txt      # Backend dependencies
```

## 💻 Usage Guide

### Upload Mode
1. Click the **Upload** tab
2. Click the upload area or drag & drop an image
3. See the preview of your selected image
4. Click **Identify Plant** button
5. Watch the scan animation run
6. View the plant analysis results
7. Optionally download the report

### Camera Mode
1. Click the **Camera** tab
2. Allow camera access when prompted
3. Frame your plant in the camera view
4. Click **Capture Photo**
5. Click **Identify Plant** to analyze
6. View results with scan animation
7. Download report if needed

### Result Analysis
After identification, you'll see:
- **Plant Name**: Common name of the identified plant
- **Scientific Name**: Latin/botanical classification
- **Usage & Benefits**: Traditional medicinal properties and health benefits
- **Additional Information**: Plant characteristics and cultivation details
- **Download Report**: Save findings as a text file

## 🤖 Model Details

- **Architecture**: MobileNetV2 (lightweight, efficient)
- **Input Size**: 224×224 pixels
- **Training Framework**: TensorFlow 2.13.0 + Keras
- **Optimization**: Quantized for faster inference
- **Accuracy**: High-performance identification across multiple plant species

## 🛠️ Technologies Used

| Category | Technology |
|----------|-----------|
| **Backend** | Flask 3.1.2, Python 3.11 |
| **Machine Learning** | TensorFlow 2.13.0, Keras 2.13.1, NumPy 1.24.3 |
| **Image Processing** | Pillow 11.3.0 |
| **Deployment** | Gunicorn 21.2.0 |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Icons** | Font Awesome 6.4.0 |

## 📊 API Endpoints

### `/` (GET)
- Returns the main application interface
- Response: HTML page

### `/predict` (POST)
- Identifies a plant from an uploaded image
- **Parameters**: 
  - `image`: Image file (multipart/form-data)
- **Response**:
  ```json
  {
    "plant": "Plant Name",
    "image_url": "/static/plant_name.jpg"
  }
  ```

### `/details` (GET)
- Retrieves detailed information about a plant
- **Parameters**:
  - `name`: Plant name (query parameter)
- **Response**:
  ```json
  {
    "plant": "Plant Name",
    "scientific_name": "Botanical Name",
    "usage": "Medicinal usage information"
  }
  ```

## 🎨 UI/UX Features

- **Responsive Design**: Adapts seamlessly to all screen sizes
- **Tab Navigation**: Easy switching between Upload and Camera modes
- **Preview Display**: Compact image preview before identification
- **Scan Animation**: Professional scanning effect during analysis
- **Error Handling**: Clear error messages for validation
- **Success Messages**: Confirmation feedback for user actions
- **Smooth Transitions**: CSS animations for polished experience
- **Accessibility**: Keyboard navigation and focus management

## 🔒 Security

- Input validation for file uploads
- Image size restrictions (max 10MB)
- File type validation (image formats only)
- CORS-ready API structure
- Secure error handling without exposing system details

## 📈 Performance Optimization

- Lightweight MobileNet model for fast inference
- Image compression during processing
- Client-side file validation
- Optimized CSS animations using GPU acceleration
- Efficient JavaScript event handling

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Camera not working | Check browser permissions and HTTPS requirement |
| Model not loading | Ensure `Model_Mobilenet.h5` exists in root directory |
| Plant images not showing | Verify `static/` folder contains plant reference images |
| Port already in use | Change port in `app.py` or kill process using port 5000 |
| Dependencies error | Update pip: `pip install --upgrade pip` |

### Environment Requirements
- `runtime.txt`: Python 3.11.6
- `procfile`: Gunicorn server configuration
- `requirements.txt`: All Python dependencies

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 📧 Contact & Support

For support, feature requests, or bug reports, please open an issue on the GitHub repository.

## 🙏 Acknowledgments

- MobileNet architecture by Google
- TensorFlow team for excellent deep learning framework
- Font Awesome for beautiful icons
- Open-source community for inspiration

---

**Made with 🌿 for plant enthusiasts and researchers**