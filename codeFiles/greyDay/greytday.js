let osc;
let fft;

const width = 500
const height = 500
const innerWidth = 250
const innerHeight = 350

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const A440 = 440; 
const num_octaves = 8

const background_color = "#F7F6F6"
const dark = "#273439"
const font = 'Fredoka'

let mySound;
let texture;
let playing = false
let angle = 0
let play_button;

function preload() {
  mySound = loadSound("sounds/nothingnew.mp3");
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

}

function play(){
  if(playing){
    playing = false
    mySound.stop()

  }else{
    playing = true
    mySound.play(0, 1, 1);
  }
}

function draw() {
  
  //the button
  if(playing){
    angle += 1
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
  for (let i = 0; i < spectrum.length; i++) { //each spectrum part
    let freq = map(i, 0, spectrum.length, 0, sampleRate()/ 2);
    let amplitude = spectrum[i]
    let noteName = freqToNoteName(freq);
    if(noteName == "undefined-Infinity" || "None" == noteName){
      continue
    }
    alterNote(noteName, freq,  amplitude)
  }

  let sorted_spectrum = spectrum.sort((a, b) => b-a);
  let top_vals =  sorted_spectrum.slice(0, 3);
  let top_3_sum = top_vals.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let top_sum_avg = Math.floor(top_3_sum/3)

  let dudeHeight;
  if(top_sum_avg>=100){
    dudeHeight = map(top_sum_avg, 100,255,20,innerHeight-80)
  }else{
    dudeHeight = 20
  }

  drawDude(dudeHeight)
  blendMode(SCREEN)
  image(texture, 0,0, width, height)
  noTint();
  blendMode(BLEND)
  applyMonochromaticGrain(20);
}

function drawDude(bodyHeight){
  push()
  let max_body_height = 150
  translate(0,max_body_height-bodyHeight + 40)
  let arm_y = height/2 -40
  let arm_center = width/2-10
  let leg_length = bodyHeight/3
  //body
  fill("black")
  fill("white")
  rectMode(CORNER)
  
  // rect(width/2 - 10, height/2 - 50, 20, 80)
  let body_end = arm_y + bodyHeight
  body_end = arm_y + bodyHeight - leg_length
  const body = [
    [arm_center, arm_y],
    [arm_center+10, arm_y],
    [arm_center +40, body_end],
    [arm_center -30, body_end],
  ]
  noiseToShape(body)

  let leg_width = 2
  const leg1 = [
    [arm_center, body_end],
    [arm_center +leg_width, body_end],
    [arm_center +leg_width, body_end + leg_length],
    [arm_center, body_end+leg_length]
  ]
  const leg2 = [
    [arm_center + 10, body_end],
    [arm_center +leg_width + 10, body_end],
    [arm_center +leg_width+10, body_end + leg_length],
    [arm_center+10, body_end+leg_length]
  ]
  noiseToShape(leg1)
  noiseToShape(leg2)


  //face
  fill("black")
  circle(width/2, height/2 - 50, 40)
  fill("white")
  let y_noise = (noise(1,frameCount*.05)-.5)*3
  let y_noise2 = (noise(2,frameCount*.05)-.5)*3
  circle(width/2-8, height/2 - 50 + y_noise,2)
  circle(width/2+6, height/2 - 50 + y_noise2,2)

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

  if(octave > 7){
    return "None"
  }
  return `${note}`;
}



function noiseToShape(points){
  let timeStamp = frameCount
  let color =  "black"
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

  const numIters = 2 // number of interpolation iterations
  for(let i = 0; i<numIters; i++){
    points = add_points(points)
  }
  
  const noiseZoom = 0.05
  const noiseLevel = 5
  const animationSpeed = .03
  fill(color)
  beginShape()
  for(let i = 1; i<points.length-1; i++){
    let x = points[i][0]
    let y = points[i][1]
    let n = noise(x*noiseZoom,y*noiseZoom, timeStamp*animationSpeed)*noiseLevel
    vertex(x + n,y + n)
  }
  endShape(CLOSE)

}



