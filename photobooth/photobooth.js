class Photobooth{
    camera
    photostrip

    constructor(video){
        this.camera = new Camera(video)
    }

    async run(){
        await this.camera.takePhotos();

        this.photostrip = new Photostrip(this.camera.photos);
        await this.photostrip.drawImages();

        this.displayStrip();
    }

    displayStrip(){
        document.getElementById("video-container").style.display = "none";
        document.getElementById("photo-editing-container").style.display = "";
    }

    save(){

        const dataURL = this.photostrip.canvas.toDataURL('image/png'); //download image
        const clicker = document.createElement('a');
        clicker.href = dataURL;

        const now = new Date();
        clicker.download = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}-photobooth.png`;
        clicker.click();
    }
}