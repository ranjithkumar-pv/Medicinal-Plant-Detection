const fileInput = document.getElementById('fileInput');
const getPlantBtn = document.getElementById('getPlant');
const plantName = document.getElementById('plantName');
const plantImage = document.getElementById('plantImage');
const scientificName = document.getElementById('scientificName');
const usage = document.getElementById('usage');
const moreBtn = document.getElementById('moreBtn');

let selectedFile = null;

// Handle file upload
fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
});

// Handle camera
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream);

document.getElementById('snap').addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(blob => {
        selectedFile = new File([blob], "camera.jpg", { type: "image/jpeg" });
    }, "image/jpeg");
});

// Handle get plant
getPlantBtn.addEventListener('click', async () => {
    if (!selectedFile) {
        alert("Please upload or capture an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    plantName.textContent = data.plant_name;
    plantImage.src = data.image_url;
    scientificName.textContent = "";
    usage.textContent = "";

    moreBtn.onclick = () => {
        scientificName.textContent = "Scientific Name: " + data.scientific_name;
        usage.textContent = "Medicinal Usage: " + data.medicinal_usage;
    }
});
