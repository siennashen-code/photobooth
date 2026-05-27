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
    }

    newFrame(int) {
        if (int == 0) {
            this.frame = this.sammi
            this.changeFrame(this.sammi)
        } else if (int == 1) {
            this.frame = this.gallery
            this.changeFrame(this.gallery)
        } else if (int == 2) {
            this.frame = this.goat
            this.changeFrame(this.goat)
        }
    }

    changeFrame(photo) {
        this.context.clearRect(0, 0, this.photostrip.canvas.width, this.photostrip.canvas.height)
        this.photostrip.drawImages()

        if (this.frame != 3) {
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
        sticker.img.style.position = "fixed"

        const move = (e) => {
            sticker.img.style.left = `${e.clientX}px`
            sticker.img.style.top = `${e.clientY}px`
        }

        const add = (e) => {
            sticker.drawSticker(this.photostrip.canvas)
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
                this.changeFrame(this.frame)
            }
        }

        document.addEventListener("mousemove", move);
        sticker.img.addEventListener("click", processClick)
    }

    resetListeners() {
        document.removeEventListener("mousemove")
    }
}