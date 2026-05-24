class Editor {
    photostrip
    context

    sammi
    gallery
    goat

    stickers = []

    constructor(photostrip) {
        this.photostrip = photostrip
        this.context = this.photostrip.canvas.getContext('2d');
    }

    drawFrame(){
        let photo

        if (this.photostrip.frame === "blank") {

        } else {
            if (this.photostrip.frame === "sammi") {
                photo = this.photostrip.sammi
            } else if (this.photostrip.frame === "gallery") {
                photo = this.photostrip.gallery
            } else if (this.photostrip.frame === "goat" ){
                photo = this.photostrip.goat
            }

            this.context.drawImage(photo, 0, 0, photo.width, photo.height, 0, 0, 300, 850)
        }

    }

    drawStickers(){
        const stickers = document.getElementsByClassName('live-stickers')
        for (let sticker of stickers) {
            const x = parseFloat(sticker.style.left)
            const y = parseFloat(sticker.style.top)
            this.drawSticker(sticker, x, y)
        }

    }

    redraw() {
        this.context.clearRect(0, 0, this.photostrip.canvas.width, this.photostrip.canvas.height)
        this.drawFrame()
        this.photostrip.drawImages()
        this.drawStickers()
    }

    stickerButtons() {
        const stickers = ['bow', 'glitter', 'heart', 'star']

        for (const sticker of stickers) {
            document.getElementById(sticker).addEventListener('click', (e) => {
                this.createSticker(sticker)
            })
        }

    }

    createSticker(type) {
        let newSticker = document.createElement('img')
        newSticker.src = `./assets/stickers/${type}.png`
        newSticker.classList.add(`live-stickers`)
        document.getElementById('live-stickers').append(newSticker);
        this.moveSticker(newSticker)
    }

    moveSticker(sticker) {
        let following = true;

        const move = (e) => {
            if (following) {
                sticker.style.left = `${e.clientX}px`;
                sticker.style.top = `${e.clientY}px`;
            }
        };

        const add = (e) => {
            following = false;
            this.drawSticker(sticker, e.clientX, e.clientY)
            document.removeEventListener("mousemove", move)
            document.removeEventListener("click", add)
        };


        document.addEventListener("mousemove", move)

        setTimeout(() => {
            document.addEventListener("click", add)
        }, 0)

    }

    drawSticker(sticker, clientX, clientY) {
        const rect = this.photostrip.canvas.getBoundingClientRect();

        const scaleX = this.photostrip.canvas.width / rect.width; //To convert from screen pixels to photostrip pi
        const scaleY = this.photostrip.canvas.height / rect.height;

        const x = (clientX - rect.left - sticker.offsetWidth / 2) * scaleX;
        const y = (clientY - rect.top - sticker.offsetHeight / 2) * scaleY;
        this.context.drawImage(sticker, x, y, sticker.offsetWidth * scaleX, sticker.offsetHeight * scaleY);
    }

}