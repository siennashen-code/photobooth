
const video = document.getElementById('video'); //display camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream);


document.getElementById('snap').addEventListener('click', takePhotos);

const photos = [];

function takePhoto() {
    const photo = document.createElement('canvas');
    const context = photo.getContext('2d');
    photo.width = 640;
    photo.height = 480;
    context.drawImage(video, 0, 0, 640, 480);
    photos.push(photo);

    const dataURL = photo.toDataURL('image/png');
    const clicker = document.createElement('a');
    clicker.href = dataURL;
    clicker.download = 'amazingphoto.png';
    clicker.click();
    console.log("hi");

}

function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, 1000 * seconds));
}

async function countDown(seconds) {
    const counter = document.createElement('div');
    counter.id = 'counter';
    document.body.appendChild(counter);

    while (seconds >= 0) {
        if (seconds == 0) {
            counter.textContent = 'smile!';
        } else {
            counter.textContent = seconds;
        }
        await wait(1);  // actually pause for 1 second
        seconds--;
    }

    counter.remove();
    console.log("hi");
}


async function takePhotos() {
    console.log("im here!");
    for (let i = 0; i < 3; i++) {
        await countDown(3);
        takePhoto();
        await wait(1);
    }
}