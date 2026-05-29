class Sticker { //functions and variables for stickers
    id //id of sticker, used for removing sticker from sticker array
    img 
    floating //whether or not sticker is floating, determines what happens after click

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

    getStickerName() { //id is a unique number
        const parentDiv = document.getElementById('live-stickers');
        let i = 0
        let childElement = document.getElementById(`${i}`)

        while (parentDiv && parentDiv.contains(childElement)) {
            i++
            childElement = document.getElementById(`${i}`)
        }

        return i
    }

    drawSticker(canvas) {
        //convert from coordinates with respect to viewport to canvas' internal coordinate system
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