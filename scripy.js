const video = document.getElementById('video') //display camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)

const camera = new Camera(video)
document.getElementById('snap').addEventListener('click', () => camera.takePhotos());




// const photos = [];

// function wait(seconds) {
//     return new Promise(resolve => setTimeout(resolve, 1000 * seconds));
// }

// async function countDown(seconds) {
//     const counter = document.createElement('div');
//     counter.id = 'counter';
//     document.body.appendChild(counter);
    
//     while (seconds > 0) {
//         counter.textContent = seconds;
//         await wait(1);
//         seconds--;
//     }

//     counter.remove();
//     console.log("countdown over");
// }

// function takePhoto() {
//     const photo = document.createElement('canvas');
//     const context = photo.getContext('2d');
//     photo.width = 640;
//     photo.height = 480;

//     context.drawImage(video, 0, 0, 640, 480);

//     photos.push(photo);

//     const dataURL = photo.toDataURL('image/png');
//     const clicker = document.createElement('a');
//     clicker.href = dataURL;
//     clicker.download = 'amazingphoto.png';
//     clicker.click();
//     console.log("hi");

// }

// async function flash() {
//     const flash = document.createElement('div');
//     flash.id = 'flash';
    
//     document.body.appendChild(flash);

//     await wait(0.05);
//     flash.style.opacity = '0';
//     await wait(0.3);

//     flash.remove();
// }

// async function photoWithFlash() {
//     const flashPromise = flash();
//     takePhoto();
//     await flashPromise;
// }

// async function takePhotos() {
//     console.log("im here!");
//     for (let i = 0; i < 3; i++) {
//         await countDown(3);
//         photoWithFlash();
//         await wait(1);
//     }
// }