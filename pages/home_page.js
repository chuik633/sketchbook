function layout_homepage(app, pages){
    const page = app.append('div').attr('class', 'page home-page')
    const header = app.append('div').attr('class', 'header row')

    const name = page.append('h1').text("KATHERINE CHUI")
    const footer = app.append('div').attr('class', 'footer row')

      //add links to pages
      for(const [page_name, info] of Object.entries(pages)){
        const layout_fn = info['layout_fn']
        pages[page_name]['page_link']= header.append('div').attr('class', 'page-link').text(page_name)
    }
    footer.append('div').attr('class', 'footer-text').text('art <> code <> math')
    footer.append('div').attr('class', 'footer-text').text('Rice // Parsons')
   
    return page
}
