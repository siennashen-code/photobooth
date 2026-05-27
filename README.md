# Sienna's Photobooth!
Note: For security purposes, your browser won't let you download your photobooth images if you run index.html directly on the broswer. To use the download feature, you have to install the Live Server extension and then run index.html through that. 

## Reflection

### Learning/implementing javascript, HTML, and CSS ###
Overall, javascript was not too difficult to pick up; a lot of the syntax is quite similar to java. I learned on the go, searching up things like "loops in js" or "declaring variables in js" while coding, and eventually I got a basic understanding of the language. HTML and CSS were also pretty simple to use, especially because I didn't do anything complex with the languages. I only used HTML and CSS to create and edit the appearances of elements.

I really appreciated the promise/async/await feature of javascript, because I needed it to properly time when each line for the camera code needed to be executed. The camera had to take photos after the countdown, so I had the camera await for a countdown to run through. 

I did struggle a lot with formatting elements on the photobooth app. Elements behave differently depending on their positioning mode (fixed, absolute, etc.), and each mode will have a different affect on the element depending on the positioning of its parent containers. And when you draw things onto a canvas, you need to use the canvases own, internal grid system rather than the grid of the entire page. So I had to do a lot of conversions and often got lost in properly formatting things. It took me days just to get the stickers to follow the mouse correctly and be drawn onto the photostrip at the correct location :-(

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
3. Editor, which has the changeFrame, moveSticker, and drawSticker methods used to, well, change the frames and add stickers to the photostrip canvas.

The instances of these classes are created in the Photobooth class, which coordinates these objects through methods like run, displayStrip, and reset. The Photobooth has a save method which downloads photostrips as png files onto the browser, so you can send photos to your friends and foes. 

### Failures ###
(As of 5/26), I failed to allow the user to edit where stickers are positioned after initially placing them down. I have two event listeners for the stickers: one for picking them up, and one for dropping them down. However, the pick-up event listener seems to override the drop, and you can never let go of stickers once you initially click them. With more time, I would make a class for the stickers with a field that tells which state the sticker is in: dropped down, or moving. That way, I can control which event listener runs.
 
- [Github commit of my sticky stickers](https://github.com/siennashen-code/photobooth/commit/c1ee3fb43eb94346ba85fec9e9ccde92ab69f34e)