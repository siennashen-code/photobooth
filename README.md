# Sienna's Photobooth!
Note: For security purposes, your browser won't let you download your photobooth images if you run index.html directly on the broswer. To use the download feature, you have to install the Live Server extension and then run index.html through that. 

## Reflection

### Learning/implementing javascript, HTML, and CSS ###
Overall, javascript was not too difficult to pick up; a lot of the syntax is quite similar to java. I learned on the go, searching up things like "loops in js" or "declaring variables in js" while coding, and eventually I got a basic understanding of the language. HTML and CSS were also pretty simple to use, especially because I didn't do anything complex with the languages. I only used HTML and CSS to create and edit the appearances of elements.

I really appreciated the promise/async/await feature of javascript, because I needed it to properly time when each line for the camera code needed to be executed. The camera had to take photos after the countdown, so I had the camera await for a countdown to run through. 

### Resources I used ###
For my programming language research, I used:
- [MDN javascript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [W3Schools javascript tutorial](https://www.w3schools.com/js/)

To understand how HTML/CSS/JS work together to create a web page and the basic features of the languages, I followed this guy's video: [HTML, CSS, and Javascript in 30 minutes](https://www.youtube.com/watch?v=_GTMOmRrqkU)

I got the live video on my photobooth app to work using this other guy's video: [Build a Photo Booth Web App](https://www.youtube.com/watch?v=3p9nsawLDjw&t=118s). I also learned about promises/async/awaits through this video: [Javascript Promises vs Async Await EXPLAINED](https://www.youtube.com/watch?v=li7FzDHYZpc)

### Classes, interfaces, functions ###
I made classes for each component of the photobooth: 
1.  Camera, which has the countDown and takePhotos functions. It also stores the photos captured in an array, which is kind of like the Photos app on your phone. 
2. Photostrip, which reads in the photo array and arranges them into a photostrip (an HTML canvas object)
3. Sticker, whose instances contain not only the sticker image (in the variable "img"), but also whether or not the sticker is floating (the "floating" variable), which will determine what happens when the sticker is clicked. 
4. Editor, which has the changeFrame, moveSticker, and drawSticker methods used to, well, change the frames and add/move stickers on the photostrip canvas. The editor also contains an array called "sticker" which stores added stickers. This is necessary because every time you move a sticker or change a frame, the entire photostrip needs to be redrawn and thus the positions of the other stickers must be saved somewhere. 

The instances of these classes are created in the Photobooth class, which coordinates these objects through methods like run, displayStrip, and reset. The Photobooth has a save method which downloads photostrips as png files onto the browser, so you can send photos to your friends and foes. 

Finally, the instance of the photobooth class is created in app.js, where event listeners are created for the buttons that map to methods from photobooth.

### Struggles ###
I did struggle a lot with formatting elements on the photobooth app. Elements behave differently depending on their positioning mode (fixed, absolute, etc.), and each mode will have a different affect on the element depending on the positioning of its parent containers. And when you draw things onto a canvas, you need to use the canvases own, internal grid system rather than the grid of the entire page. So I had to do a lot of conversions and often got lost in properly formatting things. It took me days just to get the stickers to follow the mouse correctly and be drawn onto the photostrip at the correct location. What I found quite helpful was clicking inspect on my web page and experimenting with the formatting there, then finalizing things on my css file. 

I also had some trouble coordinating the stickers and frame changes. I originally had the stickers drawn onto the photostrip just once, but then when you change frames, those stickers would get lost because the changeFrame function has to redraw the entire photostrip. So then I decided to store each sticker in an array, and the stickers get redrawn each time changeFrame runs. Thinking ahead about repositioning stickers, I planned that if you click on a placed down sticker, then that sticker gets removed from the array, effectively taking the sticker off of the photostrip. So I needed to give each sticker a distincy ID. Thus I wrote another function which took in the existing stickers and gave the new sticker an id with a new number. So the first sticker had an id of 1, the second 2, and so on.


### Failures ###
(As of 5/26), I failed to allow the user to edit where stickers are positioned after initially placing them down. I have two event listeners for the stickers: one for picking them up, and one for dropping them down. However, the pick-up event listener seems to override the drop, and you can never let go of stickers once you initially click them. With more time, I would make a class for the stickers with a field that tells which state the sticker is in: dropped down, or moving. That way, I can control which event listener runs.
- [Github commit of my sticky stickers](https://github.com/siennashen-code/photobooth/commit/c1ee3fb43eb94346ba85fec9e9ccde92ab69f34e)

(5/28): I solved the sticker problem by making a sticker class! Everytime a sticker button is clicked, a new Sticker object is created and it is added to the stickers array in Editor. The sticker's img value is set too. By default, the floating value is true. In the Editor class, an event listener for clicking this sticker is created. If the sticker is clicked while floating, then it is drawn. If the sticker is already drawn (!floating) when clicked, then it is pulled out of the photostrip and is now floating. If the sticker is placed down somewhere not on the canvas, then the sticker is removed from the sticker array and no longer exists on the screen.  

I failed to add resizing and rotating features to my stickers due to a lack of time. Especially since I'm not using any libraries, doing a bunch of transformations on one sticker is kind of complicated, especially if clicking on a sticker could have multiple effects (resize, rotate, or shift).
 
## Sources: 
