const video = document.getElementById('video') //display camera
navigator.mediaDevices.getUserMedia({
    video: {
        width: 800,
        height: 650
    }
})
.then(stream => video.srcObject = stream)

const photobooth = new Photobooth(video);

document.getElementById("photo-editing-container").style.display = "none";
document.getElementById('snap').addEventListener('click', () => photobooth.run());
document.getElementById('save').addEventListener('click', () => photobooth.save());

