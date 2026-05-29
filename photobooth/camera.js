class Camera {
    photos = []
    video

    constructor(video) {
        this.video = video
        document.getElementById('flash').style.display = "none"
    }

    wait(seconds) { //used to stop running a function for certain time by creating a promise
        return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
    }

    async countDown(seconds) { //counts down and displays on web page
        const counter = document.createElement('div')
        counter.id = 'counter'
        document.getElementById("video-container").appendChild(counter)

        while (seconds > 0) {
            counter.textContent = seconds
            await this.wait(1)
            seconds--
        }

        counter.remove()
    }

    takePhoto() { //take frame from video and save it onto canvas object
        const photo = document.createElement('canvas');
        const context = photo.getContext('2d');
        photo.width = 800;
        photo.height = 650;

        //crop video to same aspect ratio as photo
        const videoWidth = this.video.videoWidth;
        const videoHeight = this.video.videoHeight;
        const videoRatio = videoWidth / videoHeight;
        const photoRatio = photo.width / photo.height;

        let cropWidth;
        let cropHeight;
        let cropX;
        let cropY;

        if (videoRatio > photoRatio) {
            cropHeight = videoHeight
            cropWidth = videoHeight * photoRatio
            cropX = (videoWidth - cropWidth) / 2
            cropY = 0
        } else {
            cropWidth = videoWidth
            cropHeight = videoWidth / photoRatio
            cropX = 0
            cropY = (videoHeight - cropHeight) / 2
        }

        context.drawImage(
            this.video,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            photo.width,
            photo.height
        );

        this.photos.push(photo)
    }

    async flash() { //a white rectangle to imitate flashing of camera
        const flash = document.createElement('div');
        flash.id = 'flash';

        document.getElementById('video-container').appendChild(flash);

        await this.wait(0.05);
        flash.style.opacity = '0';
        await this.wait(0.3);

        flash.remove();
    }

    async photoWithFlash() {
        await this.flash();
        this.takePhoto();
    }

    async takePhotos() { //take three photos consecutively with a 3 second countdown and 1 second wait between
        for (let i = 0; i < 3; i++) {
            await this.countDown(3);
            await this.photoWithFlash();
            await this.wait(1);
        }
    }
}