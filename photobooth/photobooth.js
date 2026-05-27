class Photobooth {
    camera
    photostrip
    editor

    constructor(video) {
        this.camera = new Camera(video)
    }
    
    run() {
        document.getElementById("photo-editing-container").style.display = "none";
        document.getElementById('snap').addEventListener('click', () => this.takePhoto());
        document.getElementById('save').addEventListener('click', () => this.save());
        document.getElementById('back').addEventListener('click', () => this.reset());
    }

    async takePhoto() {
        document.getElementById("snap").style.display = "none";
        await this.camera.takePhotos();

        this.photostrip = new Photostrip(this.camera.photos);

        await this.photostrip.drawImages();
        this.displayStrip();
    }

    displayStrip() {
        this.editor = new Editor(this.photostrip)

        this.editor.createFrameButtons()
        console.log(this.editor.stickers)

        document.getElementById("video-container").style.display = "none";
        document.getElementById("photo-editing-container").style.display = "";
        this.editor.createStickerButtons()
    }

    save() {
        const dataURL = this.photostrip.canvas.toDataURL('image/png'); //download image
        const clicker = document.createElement('a');
        clicker.href = dataURL;

        const now = new Date();
        clicker.download = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}-photobooth.png`;
        clicker.click();
    }

    reset() {
        document.getElementById("photostrip").remove();
        document.getElementById("live-stickers").innerHTML = "";

        this.camera = new Camera(video);
        this.photostrip = null
        this.editor = null
    
        document.getElementById("video-container").style.display = "";
        document.getElementById("photo-editing-container").style.display = "none";
        document.getElementById("snap").style.display = "";
    }

}