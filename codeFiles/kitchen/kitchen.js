// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.sound.js

let fft;
let bckground;
const width=500
const height = 800
let y_shift = 50
let x_shift = 50
let texture;

//piano settings
let pianoNotesToCoords = {}
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const A440 = 440; 
const num_octaves = 8
const key_width = width/(num_octaves*notes.length)
const key_height = 50


let objectData = {
  "eggs":{
    x:120,
    y:445,
    width: 40,
  },
  "pot":{
    x:195,
    y:415,
    width: 78,
  },
  "radio":{
    x:64,
    y:388,
    width: 38,
  },
  "rain":{
    x:375,
    y:270,
    width: 50,
  }
}


function preload() {
  bckground = loadImage("images/background.PNG")
  texture = loadImage("images/textture.jpg")

  for(const object of Object.keys(objectData)){
    const obj_img = loadImage("images/"+object+".png")
    const obj_sound = loadSound('sounds/'+object+".mp3")
    objectData[object]["image"] = obj_img
    objectData[object]['sound']=obj_sound
    objectData[object]["playing"] = false
  }
}

function setup() {
  createCanvas(width, height);
  background("#CA370F")
  p5grain.setup();
  p5grain.setup({
    ignoreWarnings: true,
    ignoreErrors: true,
  });

  //set up each object
  for(const [name, data] of Object.entries(objectData)){
    //size the image
    let aspectRatio = data.image.height/data.image.width
    let imgheight = (data.width)/aspectRatio
    objectData[name]['height'] = data.width*aspectRatio

    //show the image
    image(data.image,data.x,data.y,data.width,data.height)
  }
  
  // Initialize FFT
  fft = new p5.FFT();

}




function draw() {
  background("#BD2B2B")
  background("#CA370F")
  let aspectRatio  = bckground.width/bckground.height
  let backgroundWidth = width-20
  let backgroundHeight = backgroundWidth/aspectRatio
  image(bckground,0,(height-backgroundHeight)/2, backgroundWidth,backgroundHeight )

  

  for(const object of Object.keys(objectData)){
    objectHoverHandler(object, mouseX, mouseY)
  }

  blendMode(SCREEN)
  tint(255,100)
  image(texture,0,0,width, height)
  noTint();
  blendMode(OVERLAY)
  applyMonochromaticGrain(20);
  blendMode(BLEND)


}




//used online to help with this
function freqToNoteName(freq) {
  const A4 = 440; // Frequency of A4
  const C0 = A4 * Math.pow(2, -4.75); // C0 frequency
  
  let noteNum = Math.round(12 * Math.log2(freq / C0));
  let octave = Math.floor(noteNum / 12);
  let note = notes[noteNum % 12];

  if(octave > 7){
    return "None"
  }
  return `${note}${octave}`;
}


function mousePressed(){
  console.log("mouse pressed")
  for(const object of Object.keys(objectData)){
    objectClickHandler(object, mouseX, mouseY)
  }
}


function checkObjectBounds(object, xPos, yPos){
  const x = objectData[object].x
  const y = objectData[object].y
  const w = objectData[object].width
  const h = objectData[object].height

  const inXBounds = x<= xPos && xPos <= x+ w
  const inYBounds = y<=yPos && yPos <= y+h
  return inXBounds && inYBounds

}

function objectHoverHandler(object, xPos, yPos){
  let scaleFactor = 1.2
  let data = objectData[object]
  if(checkObjectBounds(object, xPos, yPos)){
    let scaledWidth = (data.width)*scaleFactor
    let scaledHeight = (data.height)*scaleFactor
    let width_adjust = (scaledWidth-data.width)/2
    let height_adjust = (scaledHeight-data.height)/2

    image(data.image,
      data.x - width_adjust,
      data.y -height_adjust,
      scaledWidth,
      scaledHeight)
  }else{
    image(data.image,data.x,data.y,data.width,data.height)

  }
}
function objectClickHandler(object, xPos, yPos){
  if(checkObjectBounds(object, xPos, yPos)){
    console.log("object clicked")
    console.log(objectData[object])
    if (objectData[object].playing){ //stop sound
      objectData[object].playing = false
      objectData[object].sound.stop()

    }else{//play sound
      objectData[object].playing = true
      objectData[object].sound.play()
    }
  }
  
}

