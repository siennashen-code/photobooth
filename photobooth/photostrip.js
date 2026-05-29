class Photostrip { //functions and variables for photostrip
    photoArray //array of photos taken by camera
    canvas = document.createElement('canvas');
    context

    constructor(photoArray){
        this.photoArray = photoArray
        this.canvas.id = "photostrip"
        this.canvas.width = 300;
        this.canvas.height = 850;

        document.getElementById("photo-editing-container").appendChild(this.canvas);
        this.context = this.canvas.getContext('2d'); 
        
    }

    drawImages(){ //draw photos onto canvas
        this.context.fillStyle = "white"
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height)
        this.photoArray.forEach((photo, index) => {this.drawImage(photo,index)});
    }

    drawImage(photo, index){ //draw individual photo onto canvas
        const aspectRatio = photo.width/photo.height
        const newWidth = 9/10*this.canvas.width
        const newHeight = newWidth/aspectRatio

        const border = 0.05* this.canvas.width
        const y = border + index * (newHeight + border)

        this.context.drawImage(photo, 0, 0, photo.width, photo.height, border, y, newWidth, newHeight);

    }
           
}