// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.sound.js

let mySound;
let fft;
let bckground;
const width=800
const height = 300
let y_shift = 50
let x_shift = 50


//piano settings
let pianoNotesToCoords = {}
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const A440 = 440; 
const num_octaves = 8
const key_width = width/(num_octaves*notes.length)
const key_height = 50

function preload() {
  mySound = loadSound("sounds/fortheyhadthingstosay.mp3");
  bckground = loadImage("blue.png")

}

function setup() {
  createCanvas(width, height);
  createPianoCoords()
  console.log(pianoNotesToCoords)
  p5grain.setup();
  p5grain.setup({
    ignoreWarnings: true,
    ignoreErrors: true,
  });
  const startButton = createButton("play");
  startButton.mousePressed(start);
  
  // Initialize FFT
  fft = new p5.FFT();
  
}

function start() {
  mySound.play(0, 1, 2, 90,100);
}




function draw() {
  background("#BD2B2B")


  let spectrum = fft.analyze();

  applyMonochromaticGrain(10);

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


