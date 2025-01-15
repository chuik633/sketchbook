

function layout_dv_page(container){
    const page = container.append('div').attr('class', 'page dv-page')
    page.append('h2').text("DATA VIZ")

    const sketches = new Sketches(sketch_data)
    sketches.displaySketchesGrid(page)
    return page
}