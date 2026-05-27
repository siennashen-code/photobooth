class Editor {
    photostrip
    context

    sammi
    gallery
    goat

    frame
    stickers = []

    constructor(photostrip) {
        this.photostrip = photostrip
        this.context = this.photostrip.canvas.getContext('2d');
    }

    changeFrame(photo) {
        this.context.clearRect(0, 0, this.photostrip.canvas.width, this.photostrip.canvas.height)
        this.photostrip.drawImages()
        this.context.drawImage(photo, 0, 0, photo.width, photo.height, 0, 0, 300, 850)

        for (let sticker of this.stickers) {
            const x = parseFloat(sticker.style.left);
            const y = parseFloat(sticker.style.top);
            this.drawSticker(sticker, x, y)
        }
    }

    stickerButtons() {
        const stickers = ['bow', 'glitter', 'heart', 'star']

        for (const sticker of stickers) {
            document.getElementById(sticker).addEventListener('click', (e) => {
                let newSticker = document.createElement('img')
                newSticker.id = this.getStickerName()

                newSticker.src = `./assets/stickers/${sticker}.png`
                newSticker.classList.add(`live-stickers`)

                newSticker.style.left = `${e.clientX}px`
                newSticker.style.top = `${e.clientY}px`

                document.getElementById('live-stickers').append(newSticker)
                newSticker.addEventListener("click", this.moveSticker(newSticker))

                this.moveSticker(newSticker)
                
                newSticker.addEventListener("click", (e) => {
                    this.stickers = this.stickers.filter(item => item !== newSticker.id)
                    this.changeFrame(frame)
                    this.moveSticker(newSticker)
                })


            })
        }
    }

    getStickerName() {
        const parentDiv = document.getElementById('live-stickers');
        
        let i = 0
        let childElement = document.getElementById(`${i}`)
        
        while (parentDiv && parentDiv.contains(childElement)){
            i++
            childElement = document.getElementById(`${i}`)
        }

        return i
    }

    moveSticker(sticker) {
        console.log("moving")
        sticker.style.position = "fixed";
        let following = true;

        const move = (e) => {
            if (following) {
                sticker.style.left = `${e.clientX}px`;
                sticker.style.top = `${e.clientY}px`;
            }
        };


        const add = (e) => {
            this.drawSticker(sticker, e.clientX, e.clientY)
            following = false;

            document.removeEventListener("mousemove", move);
            document.removeEventListener("click", add);
        };


        document.addEventListener("mousemove", move);

        setTimeout(() => {
            document.addEventListener("click", add)
        }, 0);
    }



    drawSticker(sticker, clientX, clientY) {
        const rect = this.photostrip.canvas.getBoundingClientRect();

        const scaleX = this.photostrip.canvas.width / rect.width; //To convert from screen pixels to photostrip pi
        const scaleY = this.photostrip.canvas.height / rect.height;

        const x = (clientX - rect.left - sticker.offsetWidth / 2) * scaleX;
        const y = (clientY - rect.top - sticker.offsetHeight / 2) * scaleY;
        this.context.drawImage(sticker, x, y, sticker.offsetWidth * scaleX, sticker.offsetHeight * scaleY);
        sticker.push(sticker.id)
    }

}