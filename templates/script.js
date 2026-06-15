/* Production Level Scripts - Medicinal Plant Identifier */

// Global State
let currentFile = null;
let currentStream = null;

// Tab Navigation
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active state from buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'camera') {
      setTimeout(() => startCamera(), 100);
    } else {
      stopCamera();
    }
  }
}

// Camera Functions
function startCamera() {
  const video = document.getElementById('cameraVideo');
  if (!video) return;
  
  navigator.mediaDevices
    .getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    })
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      video.style.display = 'block';
      document.getElementById('cameraControls').classList.add('active');
    })
    .catch(err => {
      showError('Camera access denied or not available: ' + err.message);
    });
}

function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    const video = document.getElementById('cameraVideo');
    if (video) video.style.display = 'none';
    const controls = document.getElementById('cameraControls');
    if (controls) controls.classList.remove('active');
  }
}

function capturePhoto() {
  const video = document.getElementById('cameraVideo');
  const canvas = document.getElementById('cameraCanvas');
  const ctx = canvas.getContext('2d');

  if (!video || video.videoWidth === 0) {
    showError('Camera not ready. Please try again.');
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  canvas.toBlob(blob => {
    if (blob) {
      currentFile = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      showPreview(canvas.toDataURL());
      showSuccess('Photo captured successfully!');
      stopCamera();
      document.getElementById('predictBtn').style.display = 'inline-flex';
    }
  }, 'image/jpeg', 0.95);
}

// File Upload Handling
function initializeFileUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');

  if (!uploadArea || !fileInput) return;

  // Click to upload
  uploadArea.addEventListener('click', () => fileInput.click());

  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length) handleFile(files[0]);
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) handleFile(e.target.files[0]);
  });
}

function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    showError('Please upload a valid image file (JPG, PNG, GIF)');
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    showError('File size must be less than 10MB');
    return;
  }

  currentFile = file;
  showPreview(URL.createObjectURL(file));
  showSuccess(`Image selected: ${file.name}`);
  document.getElementById('predictBtn').style.display = 'inline-flex';
}

// Preview
function showPreview(src) {
  const container = document.getElementById('previewContainer');
  const preview = document.getElementById('preview');
  const scannerLine = document.getElementById('scannerLine');

  if (preview) preview.src = src;
  if (container) container.classList.add('active');
  if (scannerLine) scannerLine.classList.add('active');
}

// Prediction
async function predict() {
  if (!currentFile) {
    showError('Please upload or capture an image first');
    return;
  }

  const spinner = document.getElementById('spinner');
  const predictBtn = document.getElementById('predictBtn');

  if (spinner) spinner.classList.add('active');
  if (predictBtn) predictBtn.style.display = 'none';

  try {
    const formData = new FormData();
    formData.append('image', currentFile);

    const response = await fetch('/predict', {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(30000)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      showError(data.error);
    } else {
      showResult(data);
      showSuccess('Plant identified successfully!');
    }
  } catch (error) {
    showError('Error identifying plant: ' + error.message);
  } finally {
    if (spinner) spinner.classList.remove('active');
    document.getElementById('resetBtn').style.display = 'inline-flex';
  }
}

function showResult(data) {
  const resultSection = document.getElementById('resultSection');
  if (!resultSection) return;

  resultSection.style.display = 'block';
  
  if (document.getElementById('plantName')) {
    document.getElementById('plantName').textContent = data.plant || 'Unknown Plant';
  }
  if (document.getElementById('confidence')) {
    document.getElementById('confidence').textContent = 'Analysis Complete';
  }
  
  const resultImage = document.getElementById('resultImage');
  if (resultImage && data.image_url) {
    resultImage.innerHTML = `<img src="${data.image_url}" alt="${data.plant}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23999%22%3EImage Not Available%3C/text%3E%3C/svg%3E'">`;
  }

  if (document.getElementById('scientificName')) {
    document.getElementById('scientificName').textContent = data.scientific_name || 'Scientific name not available';
  }
  if (document.getElementById('usage')) {
    document.getElementById('usage').textContent = data.usage || 'Usage information not available';
  }
  if (document.getElementById('additionalInfo')) {
    document.getElementById('additionalInfo').textContent = 'Plant has been successfully identified and analyzed by the system.';
  }
}

// Reset Form
function resetForm() {
  currentFile = null;
  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = '';
  
  const previewContainer = document.getElementById('previewContainer');
  if (previewContainer) previewContainer.classList.remove('active');
  
  const resultSection = document.getElementById('resultSection');
  if (resultSection) resultSection.style.display = 'none';
  
  document.getElementById('predictBtn').style.display = 'none';
  document.getElementById('resetBtn').style.display = 'none';
  
  clearMessages();
}

// Messages
function showError(msg) {
  const el = document.getElementById('errorMessage');
  if (el) {
    el.textContent = msg;
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 5000);
  }
}

function showSuccess(msg) {
  const el = document.getElementById('successMessage');
  if (el) {
    el.textContent = msg;
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 3000);
  }
}

function clearMessages() {
  const errorEl = document.getElementById('errorMessage');
  const successEl = document.getElementById('successMessage');
  if (errorEl) errorEl.classList.remove('active');
  if (successEl) successEl.classList.remove('active');
}

// Download Report
function downloadReport() {
  const plantName = document.getElementById('plantName')?.textContent || 'Plant Analysis';
  const report = `
Medicinal Plant Analysis Report
================================
Plant: ${plantName}
Date: ${new Date().toLocaleDateString()}

This report was generated by the Medicinal Plant Identifier System.
  `;
  
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `plant-report-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  
  showSuccess('Report downloaded successfully!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeFileUpload();
});

    moreBtn.onclick = () => {
        scientificName.textContent = "Scientific Name: " + data.scientific_name;
        usage.textContent = "Medicinal Usage: " + data.medicinal_usage;
    }
});
