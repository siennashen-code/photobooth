
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

async function photoWithFlash() {
    const [result1, result2] = await Promise.all([flash(), takePhoto()]);
}

function flash() {
    const flash = document.createElement('div');
    flash.textContent = 'hi';
    flash.id = 'flash';
    document.body.appendChild(flash);
    const durationInSeconds = 2;
    const startTime = Date.now(); // Get start time in milliseconds
    while (Date.now() - startTime < durationInSeconds * 1000) {
        // const opacity = -1 * durationInSeconds ^ 2 + durationInSeconds / 2 + 1;
        flash.style.backgroundColor = `rgba(1, 1, 1, ${opacity})`;
    }
    
    flash.remove();

}

function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, 1000 * seconds));
}

async function countDown(seconds) {
    const counter = document.createElement('div');
    counter.id = 'counter';
    document.body.appendChild(counter);

    while (seconds > 0) {
        counter.textContent = seconds;
        await wait(1);  // actually pause for 1 second
        seconds--;
    }

    counter.remove();
}


async function takePhotos() {
    console.log("im here!");
    for (let i = 0; i < 3; i++) {
        await countDown(3);
        photoWithFlash();
        await wait(1);
    }
}