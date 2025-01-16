
const sketch_data = [
    new Sketch(
            'Puzzle Race', 
            project_link = 'https://chuik633.github.io/Puzzle/',
            date = 'December 2024',
            description = `
                New Yorker Mini Puzzle Advent Calendar! 
                We did a 100 piece puzzle every day of December and tracked our times. 
                I played around with visualizing average times of puzzles and made it a fun race between my family :P
                I experimented with using p5 to create rotating heads, and with using an API so that my family could modify a shared spreadsheet / see live updates.
             
                `,
            code_link = 'https://github.com/chuik633/Puzzle',
            images = ['1.png'],
            main_color = "#F7F7F0"
    ),
    new Sketch(
        'ColorSearch', 
        project_link = 'https://chuik633.github.io/ColorSearch/',
        date = 'December 2024',
        description = `
           For this project, I was interesting in extending my "Hats of the Smithsonian" project by focusing on creating a color driven search. I extended the data to include all fashion related objects from the Smithsonian Open Access Collection as I was also curious about different colors in fabrics, jewelry, shirts, pants, etc. I had a lot of fun experimenting with extracting color swatches and learnning d3.force. I also added an experimental "show gradients" button to create some coded art based on the selected colors!
            `,
        code_link = 'https://github.com/chuik633/ColorSearch',
        images = ['expand-cards.gif', 'move-clusters.gif', 'zoom.gif'],
        main_color='#E9E8E4'
    ),

    new Sketch(
        'Fish Lengths', 
        project_link = 'https://chuik633.github.io/major-studio1-code-chuik633/',
        date = 'October 2024',
        description = `
          This visualization explores the relationship between a fish’s length and the depth that they live in. I played around with translating the scale of a fish to the screen. As you scroll down, the “depth” of your screen’s view corresponds to the depth of the ocean that you are exploring! I also created a big picture plot on the side which shows the minimum, average, and maximum lengths of fish at all depths. As you scroll, this plot highlights your current depth region relative to all of the data to help orient you. For fun, I also created a dynamic “fish” sketch that moves with your mouse to help you visualize “how long a fish is”.
            `,
        code_link = 'https://github.com/chuik633/major-studio1-code-chuik633',
        images = ['scroll.gif','popup.gif',  'snaptogrid.gif'],
        main_color='#07253C'
    ),


    new Sketch(
        'Hats of the Smithsonian', 
        project_link = 'https://chuik633.github.io/QualitativeDataVizProject/',
        date = 'November 2024',
        description = `
           I collaborated with Josh Strupp on this project to create an interactive exploration of the hat collection at the Smithsonian! We organized the hats by their most vibrant colors on an HSL axis and used d3 force to allow users to move them around and reveal the hats belonging to each color. We also bucketted the hats by the date they were made, so as you scroll on the page, it controls the timeline and the hats you see.
            `,
        code_link = 'https://github.com/chuik633/QualitativeDataVizProject',
        images = ['intro_screen.gif','collection_1.gif', 'cursor_1.gif', 'display_1.gif', 'scroll_1.gif'],
        main_color='#E9E8E4'
   
    ),






]


const p5_sketch_data = [
    new Sketch(
            'Grey Day', 
            project_link = undefined,
            date = '2024',
            description = undefined,
            code_link = './codeFiles/greyDay/index.html',
            images = ['grey day.gif'],
            main_color = undefined,
        image_folder = './assets/sketch_images/',
        show_code = true
      
    ),
    new Sketch(
        'Wiggly Shapes', 
        project_link =undefined,
        date = '2024',
        description = undefined,
        code_link = ['./codeFiles/wigglyShapes/index.html', './codeFiles/wigglyFont/index.html',],
        images = ['shapes.gif',"wigglyfont.gif"],
        main_color = undefined,
        image_folder = './assets/sketch_images/',
        show_code = true
        
    ),
    
    new Sketch(
        'Table of Tables', 
        project_link = undefined,
        date = '2024',
        description = undefined,
        code_link = './codeFiles/tables/index.html',
        images = ['table of tables.gif'],
        main_color = undefined,
        image_folder = './assets/sketch_images/',
        show_code = true
       
    ),

    new Sketch(
        'Glove guy', 
        project_link = undefined,
        date = '2024',
        description = undefined,
        code_link = './codeFiles/gloveGuy/index.html',
        images = ['glove guy.gif'],
        main_color = undefined,
        image_folder = './assets/sketch_images/',
        show_code = false
       
    )
    
   ,new Sketch(
        'Parameters', 
        project_link = undefined,
        date = '2024',
        description = undefined,
        code_link = ['./codeFiles/joystick/index.html', './codeFiles/wave/index.html',],
        images = ['joystick.gif', 'wave.gif'],
        main_color = undefined,
        image_folder = './assets/sketch_images/',
        show_code = true
        
    ),new Sketch(
        'Cool Mouses', 
        project_link = undefined,
        date = '2024',
        description = undefined,
        code_link = './codeFiles/soots/index.html',
        images = ['sootsprites.gif', 'svgmouse.gif'],
        main_color = undefined,
        image_folder = './assets/sketch_images/',
        show_code = false
       
    ),
    new Sketch(
        'Ani Albers Study', 
        project_link = undefined,
        date = '2024',
        description = undefined,
        code_link = './codeFiles/anni albers study/index.html',
        images = ['1.png', "2.png", '3.png'],
        main_color = undefined,
        image_folder = './assets/sketch_images/',
        show_code = true
    
    ), new Sketch(
        'Sound', 
        project_link = undefined,
        date = '2024',
        description = undefined,
        code_link = ['./codeFiles/sounds/piano.html', './codeFiles/sounds/abstrac.html'],
        images = ['piano.gif', 'abstract.gif'],
        main_color = undefined,
        image_folder = './assets/sketch_images/',
        show_code = true
        
    )









]