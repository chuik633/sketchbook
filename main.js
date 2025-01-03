console.log(sketch_data)

const app = d3.select("#app")
for(const sketch of sketch_data){
    const sketch_container = app.append('div').attr('class', 'sketch-container')

    

    sketch.appendBlurb(sketch_container)
    sketch.appendPreview(sketch_container)
}