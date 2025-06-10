class Sketches{
    constructor(sketch_data){
        this.sketch_data = sketch_data
    }

    displaySketchesGrid(container){
        const grid_container = container.append('div').attr('class', 'grid sketches-layout')
        for(const sketch of this.sketch_data){
            const sketch_container = grid_container.append('div').attr('class', 'sketch-container')
        
            sketch.appendBlurb(sketch_container)
            // sketch.appendPreview(sketch_container)
        }
    }
}
