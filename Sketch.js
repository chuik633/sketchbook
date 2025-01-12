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
        const title_container = blurb.append('div').attr('class', 'title_container row space-between')
        title_container.append('div').attr('class', 'title').text(this.name)

        const info_container = blurb.append('div').attr('class', 'info_container column med-gap')

        if(this.date != undefined){
            title_container.append('div').attr('class', 'date').text(this.date)
        }
       
        if(this.images){
            const preview_image = info_container.append('img').attr('class', 'preview-image')
            preview_image.attr("src", `./assets/sketch_images/${this.name}/${this.images[0]}`)
            preview_image.attr("img_idx", 0).style('border', '1px solid black')
            //clicking image to open it
            preview_image.on('mouseover', ()=>preview_image.style('border', '2px solid black'))
            preview_image.on('mouseleave', ()=>preview_image.style('border', '1px solid black'))
            preview_image.on('click', ()=>{  
                this.previewCard(container)
                // window.open(this.project_link, '_blank');
            })
            if(this.images.length>1){
                const image_controls = blurb.append('div').attr('class', 'row image-controls space-between')
                
                const decrease = image_controls.append('div').attr('class', 'image-control').text('<')
                const increase = image_controls.append('div').attr('class', 'image-control').text('>')
                
                let img_idx = (preview_image.attr("img_idx"))%(this.images.length)
                //changing image
                increase.on('click', ()=>{  
                    img_idx = (preview_image.attr("img_idx") + 1)%(this.images.length)
                    preview_image.attr("img_idx", img_idx)
                    preview_image.attr('src', `./assets/sketch_images/${this.name}/${this.images[img_idx]}`)
                })
                decrease.on('click', ()=>{  
                    img_idx = (preview_image.attr("img_idx") - 1 + this.images.length)%(this.images.length)
              
                    preview_image.attr("img_idx", img_idx)
                    preview_image.attr('src', `./assets/sketch_images/${this.name}/${this.images[img_idx]}`)
                })
                
                
               
            }
           
        
        }

        if(this.description != undefined){
            info_container.append('div').attr('class', 'description hide-scrollbar').text(this.description)
        }

        // if(this.code_link != undefined){
        //     blurb.append('a')
        //         .attr("href", this.code_link)
        //         .attr('class', 'link')
        //         .text('see code')
        //         .attr("target", "_blank") 
        // }

        
    }

    previewCard(container){
        d3.select("body").style('overflow', 'hidden')
        const popup_container = container.append('div').attr('class', 'popup-container hide-scrollbar')

        //popup content
        const header = popup_container.append('div').attr('class', 'row space-between med-gap')
        this.appendBlurb(header)
        const images_container = header.append('div').attr('class', 'preview_images')
        for(const image_link of this.images){
            images_container.append('img')
                        .attr('class', 'preview-image')
                        .attr("src", `./assets/sketch_images/${this.name}/${image_link}`)
        }
        this.appendPreview(popup_container)



        // close popup
        const close_btn = popup_container.append('div').text('x').attr('class', 'close-btn')
        close_btn.on('click', ()=>{
            d3.select("body").style('overflow', 'auto')
            popup_container.remove()
        })

       

    }

 




}