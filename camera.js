class Camera {
    photos = []
    video

    constructor(video) {
        this.video = video
    }

    wait(seconds) { //used to stop running a function for certain time by creating a promise
        return new Promise(resolve => setTimeout(resolve, 1000 * seconds));
    }

    async countDown(seconds) { //counts down and displays on web page
        const counter = document.createElement('div');
        counter.id = 'counter';
        document.body.appendChild(counter);

        while (seconds > 0) {
            counter.textContent = seconds;
            await this.wait(1);
            seconds--;
        }

        counter.remove();
        console.log("countdown over");
    }

    takePhoto() { //take frame from video and save it onto canvas object
        const photo = document.createElement('canvas');
        const context = photo.getContext('2d');
        photo.width = 640;
        photo.height = 480;

        context.drawImage(video, 0, 0, 640, 480);

        this.photos.push(photo);

        const dataURL = photo.toDataURL('image/png'); //download image
        const clicker = document.createElement('a');
        clicker.href = dataURL;
        clicker.download = 'amazingphoto.png';
        clicker.click();

    }

    async flash() { //a white rectangle to imitate flashing of camera
        const flash = document.createElement('div');
        flash.id = 'flash';


        document.body.appendChild(flash);

        await this.wait(0.05);
        flash.style.opacity = '0';
        await this.wait(0.3);

        flash.remove();
    }

    photoWithFlash() {
        const flashPromise = this.flash();
        this.takePhoto();
    }

    async takePhotos() { //take three photos consecutively with a 3 second countdown and 1 second wait between
        console.log("im here!");
        for (let i = 0; i < 3; i++) {
            await this.countDown(3);
            this.photoWithFlash();
            await this.wait(1);
        }
    }

}