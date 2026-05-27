class Photobooth{
    camera
    photostrip
    editor //objects needed to take and edit photostrips

    sammi //frames
    gallery
    goat

    constructor(video){
        this.camera = new Camera(video)

        this.sammi = new Image(); 
        this.sammi.src = './assets/frames/sammi.png'

        this.gallery = new Image();
        this.gallery.src = './assets/frames/gallery.png'

        this.goat = new Image();
        this.goat.src = './assets/frames/goat.png'

    }

    async run(){
        document.getElementById("snap").style.display = "none";
        await this.camera.takePhotos();

        this.photostrip = new Photostrip(this.camera.photos);
        
        await this.photostrip.drawImages();
        this.displayStrip();
    }

    displayStrip(){
        this.editor = new Editor(this.photostrip)
        document.getElementById("video-container").style.display = "none";
        document.getElementById("photo-editing-container").style.display = "";
        this.editor.stickerButtons()
    }

    save(){
        const dataURL = this.photostrip.canvas.toDataURL('image/png'); //download image
        const clicker = document.createElement('a');
        clicker.href = dataURL;

        const now = new Date();
        clicker.download = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}-photobooth.png`;
        clicker.click();
    }

    newFrame(int){
        if (int == 0){
            this.editor.changeFrame(this.sammi)
            this.editor.frame = this.sammi
        } else if (int == 1){
            this.editor.changeFrame(this.gallery)
            this.editor.frame = this.gallery
        } else if (int == 2){
            this.editor.changeFrame(this.goat)
            this.editor.frame = this.goat
        } 
    }

    reset(){
        document.getElementById("photostrip").remove();
        document.getElementById("live-stickers").innerHTML = "";
        
        this.camera = new Camera(video);
        document.getElementById("video-container").style.display = "";
        document.getElementById("photo-editing-container").style.display = "none";
        document.getElementById("snap").style.display = "";
    }
}