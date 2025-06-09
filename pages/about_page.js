
function layout_about_page(container){
    const page = container.append('div').attr('class', 'page about-page')
    page.append('h1').text("KATHERINE CHUI")
    page.append('p').text("Welcome to my digital sketchbook/archive! I’m currently studying data visualization (MS) at Parsons. In my undergrad at Rice, I studied Math and Computer Science, but have always loved visual art and working across disciplines. ")
    return page
}