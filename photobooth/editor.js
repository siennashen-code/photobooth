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

    stickerButtons() {
        const stickers = ['bow', 'glitter', 'heart', 'star']

        for (const sticker of stickers) {
            document.getElementById(sticker).addEventListener('click', (e) => {
                let newSticker = new Sticker(e, sticker)
                this.stickers.push(newSticker)
                this.operateSticker(newSticker)
            })
        }
    }

    operateSticker(sticker) {
        sticker.floating = true
        sticker.img.style.position = "fixed"

        const move = (e) => {
            sticker.img.style.left = `${e.clientX}px`
            sticker.img.style.top = `${e.clientY}px`
        }

        const add = (e) => {
            sticker.drawSticker(this.photostrip.canvas)
        }

        document.addEventListener("mousemove", move);

        sticker.img.addEventListener("click", (e) => {
            console.log(sticker.floating)
            if (sticker.floating) {
                console.log("adding")
                document.removeEventListener("mousemove", move)
                add(e)
                sticker.floating = false
            } else {
                console.log("moving")
                document.addEventListener("mousemove", move);
                sticker.floating = true
                this.changeFrame(this.frame)
            }
        })

        // sticker.img.addEventListener("click", (e) => {
        //     if (sticker.floating) {
        //         console.log("moving")
        //         sticker.img.removeEventListener("click", add)
        //         document.addEventListener("mousemove", move);
        //         this.changeFrame(this.frame)
        //         sticker.added = false
        //     } else {
        //         document.removeEventListener("mousemove", move)
        //         sticker.img.addEventListener("click", add)
        //         sticker.img.click()
        //         sticker.added = true
        //     }
        // })
    }

    //     operateSticker(sticker) {
    //         sticker.style.position = "fixed";

    //         const move = (e) => {
    //             sticker.style.left = `${e.clientX}px`;
    //             sticker.style.top = `${e.clientY}px`;
    //         };

    //         const add = (e) => {
    //             this.drawSticker(sticker, e.clientX, e.clientY)
    //             document.removeEventListener("mousemove", move);
    //             document.removeEventListener("click", add);
    //         };


    //         document.addEventListener("mousemove", move);

    //         setTimeout(() => {
    //             document.addEventListener("click", add)
    //         }, 0);


    //     }

    //     moveSticker(sticker) {
    //         console.log("moving")
    //         sticker.style.position = "fixed";
    //         let following = true;

    //         const move = (e) => {
    //             if (following) {
    //                 sticker.style.left = `${e.clientX}px`;
    //                 sticker.style.top = `${e.clientY}px`;
    //             }
    //         };


    //         const add = (e) => {
    //             this.drawSticker(sticker, e.clientX, e.clientY)
    //             following = false;

    //             document.removeEventListener("mousemove", move);
    //             document.removeEventListener("click", add);
    //         };


    //         document.addEventListener("mousemove", move);

    //         setTimeout(() => {
    //             document.addEventListener("click", add)
    //         }, 0);
    //     }





    // }

}