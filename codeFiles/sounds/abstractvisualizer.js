// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.sound.js

let mySound;
let fft;
let bckground;
const width= 400
const height = 600

function preload() {
  mySound = loadSound("sounds/andshewas.mp3");
  bckground = loadImage("blue.png")
}

function setup() {
  createCanvas(width, height);


  const startButton = createButton("play");
  startButton.mousePressed(start);
  
  // Initialize FFT
  fft = new p5.FFT();

  
}

function start() {
  mySound.play(0, 1, 1, 30,60);
}


let rect_height = 1

function draw() {
  background("#F1734B")
  background("black")
  noStroke()

  
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length; i++) { //each spectrum part
    let amplitude = spectrum[i]
    let amp_width = map(amplitude, 0, 255, 0, width/2-10);
    fill("#FED15E")
    rect(width/2, rect_height*i,amp_width,rect_height)
    rect(width/2-amp_width, rect_height*i,amp_width,rect_height)
  }

  for (let i = 0; i < spectrum.length; i++) { //each spectrum part
    let amplitude = spectrum[i]
    let x = map(i, 0,spectrum.length, 0,width)
    let amp_height = map(amplitude, 0, 255, 0, height);
    fill("white")
    rect(x, 0,1,amp_height)
    rect(x, height - amp_height,1,amp_height)

    rect(width -x, 0,1,amp_height)
    rect(width -x, height - amp_height,1,amp_height)

    let amp_width = map(amplitude, 0, 255, 0, width);
    let y = map(i, 0,spectrum.length, 0,height)
    rect(0, y,amp_width,1)
    rect(width - amp_width, y,amp_width,1)
    rect(0, height-y,amp_width,1)
    rect(width - amp_width, height-y,amp_width,1)
   
  }


  const wave = fft.waveform(2**9);
  
  const max_widths = {
    "#E73C05":width/2,
    "#FBFBA0":width*2/3,
    "#FCFBE9":width*3/4,
    "#FBFBA0":width*4/5,
    "#E73C05":width*5/6,
    "#FCFBE9":width,
    "#FCFBE9":width*3/2,
    "#FCFBE9":width*2,
  }
  for(let [color,max_width] of Object.entries(max_widths)){
    for (let i = 0; i < wave.length; i++) {
      const x = map(wave[i], -1, 1, 0, max_width);
      const y = map(i, 0, wave.length, 0, height);
      fill(color)
      circle(width/2+x - max_width/2, y, rect_height);
      circle(width/2-x + max_width/2, y, rect_height);
    }
  }
}

