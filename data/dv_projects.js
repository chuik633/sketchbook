const dv_data = [
  new dvSketch(
    "Sound Stories",
    (project_link = "https://chuik633.github.io/SoundStories/"),
    (date = "May 2025"),
    (description = `
               This project was my thesis for my masters in Data Viz at Parsons NYC! In Sound Stories, I experimented with visualizing music, as music is a powerful story telling device that can express emotion, signify themes, and convey intensity. 
               In this project, I used p5 to created audio reactive typography for the captions of films. In the backend, I built my own processing pipeline to download youtube videos, extract image data, audio data, and captions. 
               I used tools like FFTs to deconstruct the audio files and clustering on the colors of the film to get thematic color palettes. Read more on the page!
               For the backend, I used Docker, fly.io, and supabase to store the uploaded youtube data.
               `),
    (code_link = "https://github.com/chuik633/SoundStories"),
    (images = [
      "walkthru2.gif",
      "font-prevs.gif",
      "how.gif",
      "process.gif",
      "walkthru.gif",
    ]),
    (process_images = [
      "wiggly_font.png",
      "blur_font.png",
      "strings_font.png",
      "colors.png",
      "colors2.png",
      "layouts.png",
      "figma.png",
    ]),
    (main_color = "#F7F7F0")
  ),

  new dvSketch(
    "Puzzle Race",
    (project_link = "https://chuik633.github.io/Puzzle/"),
    (date = "December 2024"),
    (description = `
                New Yorker Mini Puzzle Advent Calendar! 
                We did a 100 piece puzzle every day of December and tracked our times. 
                I played around with visualizing average times of puzzles and made it a fun race between my family :P
                I experimented with using p5 to create rotating heads, and with using an API so that my family could modify a shared spreadsheet / see live updates.
             
                `),
    (code_link = "https://github.com/chuik633/Puzzle"),
    (images = ["1.png"]),
    (main_color = "#F7F7F0")
  ),
  new dvSketch(
    "ColorSearch",
    (project_link = "https://chuik633.github.io/ColorSearch/"),
    (date = "December 2024"),
    (description = `
           For this project, I was interesting in extending my "Hats of the Smithsonian" project by focusing on creating a color driven search. I extended the data to include all fashion related objects from the Smithsonian Open Access Collection as I was also curious about different colors in fabrics, jewelry, shirts, pants, etc. I had a lot of fun experimenting with extracting color swatches and learnning d3.force. I also added an experimental "show gradients" button to create some coded art based on the selected colors!
            `),
    (code_link = "https://github.com/chuik633/ColorSearch"),
    (images = ["expand-cards.gif", "move-clusters.gif", "zoom.gif"]),
    (main_color = "#E9E8E4")
  ),
  new dvSketch(
    "Yelp Reviews",
    (project_link = "https://chuik633.github.io/yelpData/"),
    (date = "December 2024"),
    (description = `
                Visualizing yelp data: how do review sentiments change based on topic? where are restaurants open late? what proteins are most mentioned in different cuisine?
                `),
    (code_link = "https://github.com/chuik633/yelpData"),
    (images = [
      "sentimentplot.gif",
      "cuisineclusters.gif",
      "hoursplot.gif",
      "proteinplot.gif",
    ]),
    (main_color = "#F7F7F0")
  ),
  new dvSketch(
    "Fish Lengths",
    (project_link = "https://chuik633.github.io/major-studio1-code-chuik633/"),
    (date = "October 2024"),
    (description = `
          This visualization explores the relationship between a fish’s length and the depth that they live in. I played around with translating the scale of a fish to the screen. As you scroll down, the “depth” of your screen’s view corresponds to the depth of the ocean that you are exploring! I also created a big picture plot on the side which shows the minimum, average, and maximum lengths of fish at all depths. As you scroll, this plot highlights your current depth region relative to all of the data to help orient you. For fun, I also created a dynamic “fish” sketch that moves with your mouse to help you visualize “how long a fish is”.
            `),
    (code_link = "https://github.com/chuik633/major-studio1-code-chuik633"),
    (images = ["scroll.gif", "popup.gif", "snaptogrid.gif"]),
    (main_color = "#07253C")
  ),

  new dvSketch(
    "Hats of the Smithsonian",
    (project_link = "https://chuik633.github.io/QualitativeDataVizProject/"),
    (date = "November 2024"),
    (description = `
           I collaborated with Josh Strupp on this project to create an interactive exploration of the hat collection at the Smithsonian! We organized the hats by their most vibrant colors on an HSL axis and used d3 force to allow users to move them around and reveal the hats belonging to each color. We also bucketted the hats by the date they were made, so as you scroll on the page, it controls the timeline and the hats you see.
            `),
    (code_link = "https://github.com/chuik633/QualitativeDataVizProject"),
    (images = [
      "intro_screen.gif",
      "collection_1.gif",
      "cursor_1.gif",
      "display_1.gif",
      "scroll_1.gif",
    ]),
    (main_color = "#E9E8E4")
  ),
];
