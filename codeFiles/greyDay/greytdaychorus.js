let osc;
let fft;

const width = 500
const height = 750
const innerWidth = 350
const innerHeight = 350

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const A440 = 440; 
const A4 = 440; 
const C0 = A4 * Math.pow(2, -4.75); 
const num_octaves = 8
const fftSize = 1024
const sampleRate = 44100;

const background_color = "#F7F6F6"
const dark = "#273439"
const font = 'Fredoka'

let mySound;
let texture;
let playing = false
let angle = 0
let play_button;
let noteToIndices;

function preload() {
  mySound = loadSound("sounds/Kaleidoscope.mp3");
  texture = loadImage("textture.jpg")
}


function setup() {
  createCanvas(width, height);
  background(background_color)
  noStroke()
  textFont(font);

  p5grain.setup();
  p5grain.setup({
    ignoreWarnings: true,
    ignoreErrors: true,
  });

  play_button = document.getElementById('start_svg');
  play_button.addEventListener('click', play);

  fft = new p5.FFT();
  noteToIndices= noteToSpectrumMapping()
  console.log(noteToIndices)
}

function play(){
  if(playing){
    playing = false
    mySound.stop()

  }else{
    playing = true
    mySound.play(0, 1, 1, 0, 100);
  }
}



function draw() {
  //the button
  if(playing){
    angle += 2
  }else{
    angle = 0
  }
  play_button.style.transform = `rotate(${angle}deg)`

  background(background_color)
  //draw canvas
  rectMode(CENTER)
  fill("#EAEAEA")
  rect(width/2, height/2, innerWidth, innerHeight)

  // sound analysis
  let spectrum = fft.analyze();
  for(const [noteOctaveName, indices] of Object.entries(noteToIndices)){
    let amp_avg = 0
    for(let i of indices){
      amp_avg += spectrum[i]
    }
    let freq = map(indices[0], 0, spectrum.length, 0, sampleRate/ 2);
    amp_avg = amp_avg/indices.length
    let noteName = noteOctaveName.slice(0,noteOctaveName.length-1)
    let octave = parseInt(noteOctaveName.slice(noteOctaveName.length-1))
    // console.log(noteName, octave, amp_avg)
    layOutDude(noteName, octave, amp_avg)
    alterNote(noteName, freq,  amp_avg)
  }


  blendMode(SCREEN)
  image(texture, 0,0, width, height)
  noTint();
  blendMode(BLEND)
  applyMonochromaticGrain(20);
}


function layOutDude(noteName, octave, amplitude){
  let note_idx = notes.indexOf(noteName)
  let y = 140
  let y_gap = 80
  let x = 120+ note_idx*22
  let fill_color = "black"
  if(octave<5){
    fill_color = "black"
    y = y+y_gap*3
  }
  else if(octave<6){ //altos
    fill_color = "#3E3E3E"
    y = y+y_gap*3
  }else if(octave < 7){ //middle
    fill_color = "#6C6C6C"
    y = y+y_gap*2
  }else if (octave<8){ //sopranos
    fill_color = "#9B9B9B"
    y=y+y_gap*1
  }else{
    fill_color = "#CBCBCB"
    y=y
  }
  let dudeHeight = map(amplitude, 100,255,20,60)
  if(dudeHeight < 20){
    dudeHeight = 20
  }
  // console.log("drawing a dude:", noteName,note_idx,  octave)
  fill(fill_color)
  drawDude(dudeHeight, x, y)
  
}
function drawDude(bodyHeight, x, y){
  push()
  let max_body_height = 100
  translate(0,max_body_height-bodyHeight + 40)
  let leg_length = bodyHeight/3
  //body
  rectMode(CORNER)
  
  // rect(width/2 - 10, height/2 - 50, 20, 80)
  let body_end = y + bodyHeight
  body_end = y + bodyHeight - leg_length
  let body_width = 15
  const body = [
    [x, y-2],
    [x+10, y-2],
    [x +body_width, body_end],
    [x -body_width + 10, body_end],
  ]
  noiseToShape(body)

  let leg_width = 2
  const leg1 = [
    [x+2, body_end],
    [x +2+leg_width, body_end],
    [x +2+leg_width, body_end + leg_length],
    [x+2, body_end+leg_length]
  ]
  const leg2 = [
    [x + 8, body_end],
    [x +leg_width + 8, body_end],
    [x +leg_width+8, body_end + leg_length],
    [x+8, body_end+leg_length]
  ]
  noiseToShape(leg1)
  noiseToShape(leg2)


  //face
  circle(x+8, y-8, 20)
  fill("white")
  let y_noise = (noise(1,frameCount*.05)-.5)*3
  let y_noise2 = (noise(2,frameCount*.05)-.5)*3
  circle(x+2, y -8 + y_noise,2)
  circle(x+13, y -8+ y_noise2,2)

  // if(bodyHeight > 40){
  //   ellipse(x+8, y-8,4, 10)
  // }else if(bodyHeight > 60){
  //   ellipse(x+8, y-8,4, 10)
  // }else{
  //   ellipse(x+8, y-8,4, .2)
  // }
  pop()
  


}

function alterNote(noteName, freq, amplitude){
  let note = document.getElementById(noteName);
  if(note == null){
    return
  }
  let angle = map(frameCount*2, 0, Math.floor(freq/5), 0,360)
  let size = map(amplitude, 0,255, 5,40) //size based on amplitude
  let weight = map(amplitude, 0,255, 300,1000) 
  note.style.transform = `rotate(${angle}deg)`
  note.style.fontSize = `${size}px`
  note.style.fontWeight = `${weight}`

}

function freqToNoteName(freq) {
  const A4 = 440; // Frequency of A4
  const C0 = A4 * Math.pow(2, -4.75); // C0 frequency
  
  let noteNum = Math.round(12 * Math.log2(freq / C0));
  let octave = Math.floor(noteNum / 12);
  let note = notes[noteNum % 12];

  if(octave > 8){
    return "None"
  }
  return [`${note}`, octave];
}

function freqToIndex(freq) {
  return Math.round((fftSize / 2) * (freq /sampleRate));
}

function noteToSpectrumMapping() {
  const mapping = {};

  for (let octave = 0; octave <= 8; octave++) {
      for (let i = 0; i < notes.length; i++) {
          const note = notes[i];
          const freq = C0 * Math.pow(2, (octave * 12 + i) / 12);
          const nextFreq = C0 * Math.pow(2, (octave * 12 + (i + 1)) / 12);
          const startIdx = freqToIndex(freq, sampleRate, fftSize);
          const endIdx = freqToIndex(nextFreq, sampleRate, fftSize);
          for (let j = startIdx; j < endIdx; j++) {
              if (!mapping[note + octave]) {
                  mapping[note + octave] = [];
              }
              mapping[note + octave].push(j);
          }
      }
  }
  
  return mapping;
}


function noiseToShape(points){
  let timeStamp = frameCount
  function y_line(point1, point2, input_x){
    //y=mx + b
    let [x1,y1] = point1
    let [x2,y2] = point2
    let m = (y2-y1)/(x2-x1)

    let output_y = m*(input_x-x1) +y1 
    return output_y
  }

  function add_points(points){
    var newPoints = []
    for(let i = 0; i<points.length; i++){
      let nextPointIdx = (i+1)%(points.length)
      let nextPoint = points[nextPointIdx]
      let currPoint = points[i]
      let midpoint_x = (currPoint[0]+nextPoint[0])/2

      midpoint_y = y_line(currPoint, nextPoint, midpoint_x)

      newPoints.push(currPoint)
      newPoints.push([midpoint_x, midpoint_y])
    }
    return newPoints
  }

  const numIters = 3 // number of interpolation iterations
  for(let i = 0; i<numIters; i++){
    points = add_points(points)
  }
  
  const noiseZoom = 0.05
  const noiseLevel = 5
  const animationSpeed = .05
  beginShape()
  for(let i = 1; i<points.length-1; i++){
    let x = points[i][0]
    let y = points[i][1]
    let n = noise(x*noiseZoom,y*noiseZoom, timeStamp*animationSpeed)*noiseLevel
    vertex(x + n,y + n)
  }
  endShape(CLOSE)

}



