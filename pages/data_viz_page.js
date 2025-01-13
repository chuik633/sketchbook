

function layout_dv_page(container){
    const page = container.append('div').attr('class', 'page dv-page')
    page.append('h1').text("DV  PAGE")

    const sketches = new Sketches(sketch_data)
    sketches.displaySketchesGrid(page)
    return page
}