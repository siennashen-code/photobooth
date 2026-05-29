class Editor {
    photostrip
    context

    sammi
    gallery
    goat

    frame = 3
    stickers = []

    constructor(photostrip) {
        this.photostrip = photostrip
        this.context = this.photostrip.canvas.getContext('2d');

        this.sammi = new Image();
        this.sammi.src = './assets/frames/sammi.png'

        this.gallery = new Image();
        this.gallery.src = './assets/frames/gallery.png'

        this.goat = new Image();
        this.goat.src = './assets/frames/goat.png'
    }

    createFrameButtons() {
        document.getElementById('sammi').addEventListener('click', () => this.newFrame(0));
        document.getElementById('gallery').addEventListener('click', () => this.newFrame(1));
        document.getElementById('goat').addEventListener('click', () => this.newFrame(2));
        document.getElementById('blank').addEventListener('click', () => this.newFrame(3))
    }

    newFrame(int) {
        if (int == 0) {
            this.frame = 0
            this.changeFrame(this.sammi)
        } else if (int == 1) {
            this.frame = 1
            this.changeFrame(this.gallery)
        } else if (int == 2) {
            this.frame = 2
            this.changeFrame(this.goat)
        } else {
            this.frame = 3
            this.changeFrame()
        }
    }

    changeFrame(photo) {
        this.context.clearRect(0, 0, this.photostrip.canvas.width, this.photostrip.canvas.height)
        this.photostrip.drawImages()

        if (this.frame < 3) {
            this.context.drawImage(photo, 0, 0, photo.width, photo.height, 0, 0, 300, 850)
        }

        for (let sticker of this.stickers) {
            if (sticker.floating == false) {
                const x = parseFloat(sticker.img.style.left)
                const y = parseFloat(sticker.img.style.top)
                sticker.drawSticker(this.photostrip.canvas)
            }
        }
    }

    createStickerButtons() {
        const stickers = ['bow', 'glitter', 'heart', 'star']

        for (const sticker of stickers) {
            document.getElementById(sticker).onclick = (e) => {
                let newSticker = new Sticker(e, sticker)
                this.stickers.push(newSticker)
                this.operateSticker(newSticker)
            }
        }
    }

    operateSticker(sticker) {
        sticker.img.style.position = "absolute"

        const move = (e) => {
            const parentRect = document.getElementById("photo-editing-container").getBoundingClientRect();
            sticker.img.style.left = `${e.clientX - parentRect.left}px`
            sticker.img.style.top = `${e.clientY - parentRect.top}px`
        }

        const add = (e) => {
            const rect = this.photostrip.canvas.getBoundingClientRect();

            const leftEdge = rect.left
            const rightEdge = rect.right
            const topEdge = rect.top
            const bottomEdge = rect.bottom

            // Check if the click was outside the horizontal bounds of the canvas
            if (e.clientX < leftEdge || e.clientX > rightEdge || e.clientY < topEdge || e.clientY > bottomEdge) {
                sticker.img.remove()
                this.stickers = this.stickers.filter(s => s !== sticker);
            } else {
                sticker.drawSticker(this.photostrip.canvas)
            }
        }

        const processClick = (e) => {
            console.log(sticker.floating)

            if (sticker.floating) {
                console.log("adding")
                document.removeEventListener("mousemove", move)
                console.log("removed follower")
                add(e)
                sticker.floating = false
            } else {
                console.log("moving")
                document.addEventListener("mousemove", move);
                sticker.floating = true
                this.newFrame(this.frame)
            }
        }

        document.addEventListener("mousemove", move);
        sticker.img.addEventListener("click", processClick)
    }

    resetListeners() {
        document.removeEventListener("mousemove")
    }
}