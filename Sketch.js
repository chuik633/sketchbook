class Sketch{
    constructor(name, project_link = undefined, date = undefined, description = undefined, code_link = undefined, images = undefined,  main_color = undefined,image_folder = './assets/sketch_images/'){
        this.name = name
        this.date = date
        this.description = description

        this.project_link =  project_link
        this.code_link = code_link
        this.images = images
        console.log(images)
        this.image_folder = image_folder
        

        this.main_color = main_color
        if(main_color == undefined){
            this.main_color = getComputedStyle(document.documentElement).getPropertyValue('--my-color').trim();
        }else{
            this.main_color = main_color
        }
        
        this.front_color = 'black'
        function isColorDark(hex) {
            hex = hex.replace("#", "");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
    
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
     
            return luminance < 128;
        }
        // console.log(this.main_color)
        if(isColorDark(this.main_color)){
            this.front_color = 'white'
        }
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
    appendBlurb(container, popup = false){
        if(this.main_color && !popup){
             container.on('mouseover', ()=>{
            container.style('background-color', this.main_color).style('color', this.front_color)
            }).on('mouseleave', ()=>{
                container.style('background-color', 'inherit').style('color', 'black')

            })

        }
         
       
        const blurb = container.append('div')
                    .attr('class', 'project-blurb')
                
        const title_container = blurb.append('div').attr('class', 'title_container row space-between')
        title_container.append('div').attr('class', 'title').text(this.name)

        const info_container = blurb.append('div').attr('class', 'info_container column med-gap')

        if(this.date != undefined){
            title_container.append('div').attr('class', 'date').text(this.date)
        }
       
        if(this.images){
            const preview_image = info_container.append('img').attr('class', 'preview-image')
            preview_image.attr("src", `${this.image_folder}${this.name}/${this.images[0]}`)
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
                    preview_image.attr('src', `${this.image_folder}${this.name}/${this.images[img_idx]}`)
                })
                decrease.on('click', ()=>{  
                    img_idx = (preview_image.attr("img_idx") - 1 + this.images.length)%(this.images.length)
              
                    preview_image.attr("img_idx", img_idx)
                    preview_image.attr('src', `${this.image_folder}${this.name}/${this.images[img_idx]}`)
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
        if(this.main_color !=undefined){
            d3.select(':root').style('--current-back', this.main_color )
            d3.select(':root').style('--current-front', this.front_color)
        }
       
        d3.select("body").style('overflow', 'hidden')
        const popup_container = d3.select("#app").append('div').attr('class', 'popup-container hide-scrollbar')

        //popup content
        const header = popup_container.append('div').attr('class', 'row space-between med-gap')
        this.appendBlurb(header, true)
        const images_container = header.append('div').attr('class', 'preview_images')
        for(const image_link of this.images){
            images_container.append('img')
                        .attr('class', 'preview-image')
                        .attr("src", `${this.image_folder}${this.name}/${image_link}`)
        }
        this.appendPreview(popup_container)



        // close popup
        const close_btn = popup_container.append('div').text('x').attr('class', 'close-btn')
        close_btn.on('click', ()=>{
            d3.select(':root').style('--current-back', d3.select(':root').style('--default-back') )
            d3.select(':root').style('--current-front', 'black')
            d3.select("body").style('overflow', 'auto')
            popup_container.remove()
        })

       

    }

 




}