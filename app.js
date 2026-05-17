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
document.getElementById('sammi').addEventListener('click', () => photobooth.newFrame(0));
document.getElementById('gallery').addEventListener('click', () => photobooth.newFrame(1));
document.getElementById('goat').addEventListener('click', () => photobooth.newFrame(2));
document.getElementById('save').addEventListener('click', () => photobooth.save());
document.getElementById('back').addEventListener('click', () => photobooth.reset());

