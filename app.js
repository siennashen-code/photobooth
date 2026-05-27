const video = document.getElementById('video') //display camera
navigator.mediaDevices.getUserMedia({
    video: {
        width: 800,
        height: 650
    }
})
.then(stream => video.srcObject = stream)

const photobooth = new Photobooth(video);
photobooth.run();
