class Sketch{
    constructor(name, project_link = undefined, date = undefined, description = undefined, code_link = undefined, images = undefined,  main_color = undefined,image_folder = './assets/sketch_images/', show_code = false){
        this.name = name
        this.date = date
        this.description = description

        this.project_link =  project_link
        this.code_link = code_link
        this.show_code = show_code
        if(this.code_link && show_code ){
            if(Array.isArray(this.code_link )){
                 this.code_folder = code_link[0].substring(0, code_link.lastIndexOf('/'));
                this.code_script = this.code_folder + '/sketch.js'
            }else{
                 this.code_folder = code_link.substring(0, code_link.lastIndexOf('/'));
                this.code_script = this.code_folder + '/sketch.js'
                console.log('this.code_script', this.code_script)
            }
           

        }
        
        this.images = images

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
                this.previewCard()
                // window.open(this.project_link, '_blank');
            })
            if(this.images.length>1){
                const image_controls = container.append('div').attr('class', 'row image-controls space-between')
                
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

    previewCard(){
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
        let img_num = 0
        let multiple_code_links=Array.isArray(this.code_link)
        for(const image_link of this.images){
            let img = images_container.append('img')
                        .attr('class', 'preview-image')
                        .attr('img_num', img_num)
                        .attr('id', `preview-image-${this.name}-${img_num}`)
                        .attr("src", `${this.image_folder}${this.name}/${image_link}`)
            
            if(multiple_code_links){
                img.on('mouseover', ()=>img.style('border', '2px solid black'))
                img.on('mouseleave', ()=>img.style('border', '.1px solid black'))
                img.on('click', ()=>{
                    console.log(this.code_link,img.attr('img_num'),this.code_link.length)
                    popup_container.selectAll('.code-preview').remove()
                    this.loadSketch(popup_container,this.code_link[img.attr('img_num')])
                })
            }
            console.log("img num", img_num)
            img_num = img_num +1;
        }

        if(this.project_link){
            this.appendPreview(popup_container)
        }
        if(this.code_link.includes('codeFiles')){
            this.loadSketch(popup_container, this.code_link)
        }else if( multiple_code_links){
            this.loadSketch(popup_container,this.code_link[0])
        }



        // close popup
        const close_btn = popup_container.append('div').text('x').attr('class', 'close-btn')
        close_btn.on('click', ()=>{
            d3.select(':root').style('--current-back', d3.select(':root').style('--default-back') )
            d3.select(':root').style('--current-front', 'black')
            d3.select("body").style('overflow', 'auto')
            popup_container.remove()
        })

       

    }

    async loadSketch(container, codeSrc){
        const code_container = container.append('div').attr('class', 'row code-preview')
        if(this.show_code){
            const code_text = await this.getScriptSrc()
            console.log("GOT CODE TEXT")
            code_container.append("p").text(code_text).style('width', '300px')

        }
        const iframe_container = code_container.append('div').style('width', "100%").style('height', "100%")
        
        const iframe = iframe_container.append('iframe')
            .attr('src', codeSrc)
            // .style('width', '100%')
            .style('width', '100%')
            .style('min-width', '500px')
            // .attr('scrolling', 'no')
            .style('height', 'fit-content')
            .style('min-height', '500px')
            .style('flex-shrink', 0)

        iframe.on("load", function() {
            resizeIframe(iframe)
            // const iframeDoc = this.contentDocument || this.contentWindow.document;
        

            // const contentHeight = iframeDoc.documentElement.scrollHeight;
            // d3.select(this)
            //     .style("height", contentHeight + "px");
            });
    }

    async getScriptSrc() {
        try {
            const response = await fetch(this.code_script);  // Await the response
            const jsCode = await response.text();  // Await the text content of the JS file
            console.log("JS CODE obtained");
            const formatted_code = jsCode.replace(/\n/g, '\n');
            // console.log(formatted_code)
            return  formatted_code// Return the code once it's ready
        } catch (error) {
            console.error("Error fetching JS code:", error);
            return '';  // Return an empty string in case of error
        }
    }
}

function resizeIframe(iframe) {
    // Get the iframe's content dimensions
    const iframeDoc = iframe.node().contentDocument || iframe.node().contentWindow.document;
    const contentWidth = iframeDoc.documentElement.scrollWidth;
    const contentHeight = iframeDoc.documentElement.scrollHeight;

    // Get the iframe's container dimensions (assuming the iframe is inside a flex container)
    const container = iframe.node().parentElement; // or you can specify a container selector
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Calculate the scaling factor based on content overflow relative to container
    const scaleWidth = containerWidth / contentWidth;
    const scaleHeight = containerHeight / contentHeight;

    // Choose the smallest scaling factor to fit both width and height
    console.log('container dimensions', containerWidth, containerHeight)
    console.log('sketch dimensions', contentWidth, contentHeight)
    console.log("scale", scaleWidth, scaleHeight)
    const scale = Math.min(scaleWidth, scaleHeight, 1);
    // console.log('scalingi by', scale)

    // Apply the scale to the iframe
    iframe.style("transform", `scale(${scale})`).style("height", contentHeight + "px");

    console.log("TOP SCALE", (containerHeight - contentHeight) / 2)
    console.log("SIDE SCALE", (containerWidth - contentWidth) / 2)
    iframe.style("top", (containerHeight - contentHeight) / 2 + "px");
}
