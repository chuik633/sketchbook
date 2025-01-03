class Sketch{
    constructor(name, project_link, date = undefined, description = undefined, code_link = undefined, images = undefined){
        this.name = name
        this.date = date
        this.description = description

        this.project_link =  project_link
        this.code_link = code_link
        this.images = images
    }


    //preview project/embed project
    appendPreview(container, aspectRatio = 9/16){
        const preview = container.append('div')
                .style('position', 'relative')
                .style('width', '100%')
                .style('height', '0')
                .style('padding-top',`${aspectRatio*100}%`); 
        const iframe = preview.append('iframe')
                .attr('src', this.project_link)
                .style('position', 'absolute')
                .style('width', '100%')
                .style('height', '100%')
                .style('top', '0px')
                .style('left', '0px')
            
    }

   

    //get an html of the project info
    appendBlurb(container){
        const blurb = container.append('div').attr('class', 'project-blurb')
        blurb.append('div').attr('class', 'title').text(this.name)

        if(this.date != undefined){
            blurb.append('div').attr('class', 'date').text(this.date)
        }
       

        if(this.description != undefined){
            blurb.append('div').attr('class', 'description').text(this.description)
        }

        if(this.code_link != undefined){
            blurb.append('a')
                .attr("href", this.code_link)
                .attr('class', 'link')
                .text('see code')
                .attr("target", "_blank") 
        }

        
    }

     //get a gallery of images


}