const app = d3.select("#app")

let pages = {
    'about':{
        "layout_fn":layout_about_page,
        'page_link':undefined,
        'page':undefined
    },
    'data viz':{
        "layout_fn":layout_dv_page,
        'page_link':undefined,
        'page':undefined
    },
    'code sketches':{
        "layout_fn":layout_code_sketches_page,
        'page_link':undefined,
        'page':undefined
    },
    'physical art':{
        "layout_fn":layout_physical_art_page,
        'page_link':undefined,
        'page':undefined
    },
}


const home_page = layout_homepage(app, pages)

//set up each page
for(const[page_name, page_info] of Object.entries(pages)){
    //create each page
    const layout_fn = page_info['layout_fn']
    const page = layout_fn(app)
    page_info['page'] = page

    //add link functionality
    const page_link = page_info['page_link']
    page_link.on('click', ()=>{
        console.log("opening page", page_name)
        d3.selectAll(".page").style('visibility', 'hidden').style('z-index', -1)
        page.style('visibility', 'visible').style('z-index', 1)
    })
    d3.selectAll(".page").style('visibility', 'hidden').style('z-index', -1)

}
// home_page.style('visibility', 'visible').style('z-index', 1)
pages['code sketches']['page'].style('visibility', 'visible').style('z-index', 1)



