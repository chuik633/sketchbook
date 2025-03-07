function layout_homepage(app, pages){
    const page = app.append('div').attr('class', 'page home-page')
    
    const header = app.append('div').attr('class', 'header row')
    
    const name = page.append('h1').text("KATHERINE CHUI")
    const footer = app.append('div').attr('class', 'footer row')

    if(window.innerWidth < 600){//collapsible meu
        header.style('visibility','hidden' ).style('transition', 'all .5s ease')
        header.selectAll("*").style('visibility','hidden' )
        const menu_button = app.append('div').attr('id', 'menuButton')
        menu_button.selectAll("div")
        .data([0, 1, 2]) // Create three lines
        .enter()
        .append("div")
        .attr("class", "line");
  


        menu_button.on('click', ()=>{
            if(menu_button.attr('class')=='open'){
                menu_button.attr('class', '');
                    header.selectAll("*").style('visibility','hidden' )
            header.style('visibility','hidden' )
            }else{
                menu_button.attr('class', 'open');
                header.selectAll("*").style('visibility','visible' )
            header.style('visibility','visible' )
            }
            
            
        })
       
    

    }
    //add links to pages
    for(const [page_name, info] of Object.entries(pages)){
        const layout_fn = info['layout_fn']
        pages[page_name]['page_link']= header.append('div').attr('class', 'page-link').text(page_name)
     
        
    }

   

    footer.append('div').attr('class', 'footer-text').text('art <> code <> math')
        footer.append('div').attr('class', 'footer-text').text('Rice // Parsons')
    
     
    return page
}
