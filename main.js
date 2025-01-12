console.log(sketch_data)

const app = d3.select("#app")

const sketches = new Sketches(sketch_data)

sketches.displaySketchesGrid(app)
