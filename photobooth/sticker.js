class Sticker {
    id
    img
    floating

    constructor(e, sticker) {
        let newSticker = document.createElement('img')
        newSticker.id = this.getStickerName()

        newSticker.src = `./assets/stickers/${sticker}.png`
        newSticker.classList.add(`live-stickers`)

        const parentRect = document.getElementById("photo-editing-container").getBoundingClientRect();

        newSticker.style.left = `${e.clientX - parentRect.left}px`
        newSticker.style.top = `${e.clientY - parentRect.top}px`

        document.getElementById('live-stickers').append(newSticker)

        this.img = newSticker
        this.id = newSticker.id
        this.floating = true
    }

    getStickerName() {
        const parentDiv = document.getElementById('live-stickers');
        let i = 0
        let childElement = document.getElementById(`${i}`)

        while (parentDiv && parentDiv.contains(childElement)) {
            i++
            childElement = document.getElementById(`${i}`)
        }

        return i
    }


    // operateSticker(canvas) {
    //     this.img.style.position = "fixed"
    //     const move = (e) => {
    //         // this.dropped = true
    //         this.img.style.left = `${e.clientX- }px`
    //         this.img.style.top = `${e.clientY}px`
    //     }

    //     const add = (e) => {
    //         // this.dropped = false
    //         this.drawSticker(canvas, e.clientX, e.clientY)
    //     }

    //     document.addEventListener("mousemove", move);

    //     this.img.addEventListener("click", (e) => {
    //         if (this.floating) {
    //             add(e)
    //             document.removeEventListener("mousemove", move)
    //             this.floating = false
    //         } else {
    //             document.addEventListener("mousemove", move);
    //             this.floating = true
    //         }
    //     })
    // }

    drawSticker(canvas) {
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const parentRect = this.img.offsetParent.getBoundingClientRect();
        const viewportX = parentRect.left + parseFloat(this.img.style.left);
        const viewportY = parentRect.top + parseFloat(this.img.style.top);

        const x = (viewportX - rect.left) * scaleX;
        const y = (viewportY - rect.top) * scaleY;

        const width = this.img.offsetWidth * scaleX;
        const height = this.img.offsetHeight * scaleY;

        context.drawImage(this.img, x, y, width, height);
    }
}