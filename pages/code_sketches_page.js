
function layout_code_sketches_page(container){
    const page = container.append('div').attr('class', 'page code-sketches-page')
    page.append('h2').text("CODE SKETCHES PAGE")

    const sketches = new Sketches(p5_sketch_data)
    sketches.displaySketchesGrid(page)
   
    return page
}