class Editor{
    photostrip
    context

    sammi
    gallery
    goat

    constructor(photostrip){
        this.photostrip = photostrip
        this.context = this.photostrip.canvas.getContext('2d'); 
    }

    changeFrame(photo){
        this.context.clearRect(0, 0, this.photostrip.canvas.width, this.photostrip.canvas.height)
        this.photostrip.drawImages()
        this.context.drawImage(photo, 0, 0, photo.width, photo.height, 0, 0, 300, 850)
    }

}