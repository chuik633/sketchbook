class Sketch {
  constructor(
    name,
    project_link = undefined,
    date = undefined,
    description = undefined,
    code_link = undefined,
    images = undefined,
    main_color = undefined,
    image_folder = "./assets/sketch_images/",
    show_code = false
  ) {
    this.name = name;
    this.date = date;
    this.description = description;

    this.project_link = project_link;
    this.code_link = code_link;
    this.show_code = show_code;
    if (this.code_link && show_code) {
      if (Array.isArray(this.code_link)) {
        this.code_folder = code_link[0].substring(
          0,
          code_link.lastIndexOf("/")
        );
        this.code_script = this.code_folder + "/sketch.js";
      } else {
        this.code_folder = code_link.substring(0, code_link.lastIndexOf("/"));
        this.code_script = this.code_folder + "/sketch.js";
      }
    }

    this.images = images;

    this.image_folder = image_folder;

    this.main_color = main_color;
    if (main_color == undefined) {
      this.main_color = getComputedStyle(document.documentElement)
        .getPropertyValue("--my-color")
        .trim();
    } else {
      this.main_color = main_color;
    }

    this.front_color = "black";
    function isColorDark(hex) {
      hex = hex.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

      return luminance < 128;
    }
    this.isDark = isColorDark(this.main_color);
    // console.log(this.main_color)
    if (this.isDark) {
      this.front_color = "white";
    }
  }

  //preview project/embed project
  appendPreview(container, aspectRatio = 9 / 16) {
    const preview = container
      .append("div")
      .style("position", "relative")
      .style("width", "100%")
      .style("height", "auto")
      // .style('background', 'pink')
      .style("padding-top", `${aspectRatio * 100}%`);
    const iframe = preview
      .append("iframe")
      .attr("src", this.project_link)
      .style("position", "absolute")
      .style("width", "100%")
      .style("height", "100%")
      .style("top", "0px")
      .style("left", "0px");
  }

  //get an html of the project info
  appendBlurb(container, popup = false) {
    if (this.main_color && !popup) {
      container
        .on("mouseover", () => {
          container
            .style("background-color", this.main_color)
            .style("color", this.front_color);
        })
        .on("mouseleave", () => {
          container
            .style("background-color", "inherit")
            .style("color", "black");
        });
    }

    const blurb = container.append("div").attr("class", "project-blurb");

    const title_container = blurb
      .append("div")
      .attr("class", "title_container row space-between");
    title_container.append("div").attr("class", "title").text(this.name);

    const info_container = blurb
      .append("div")
      .attr("class", "info_container column med-gap");

    if (this.date != undefined) {
      title_container.append("div").attr("class", "date").text(this.date);
    }

    if (this.images) {
      const preview_image = info_container
        .append("img")
        .attr("class", "preview-image");
      preview_image.attr(
        "src",
        `${this.image_folder}${this.name}/${this.images[0]}`
      );
      preview_image.attr("img_idx", 0).style("border", "1px solid black");
      //clicking image to open it
      preview_image.on("mouseover", () =>
        preview_image.style("border", "2px solid black")
      );
      preview_image.on("mouseleave", () =>
        preview_image.style("border", "1px solid black")
      );
      preview_image.on("click", () => {
        this.previewCard();
        // window.open(this.project_link, '_blank');
      });
      if (this.images.length > 1) {
        const image_controls = container
          .append("div")
          .attr("class", "row image-controls space-between");

        const decrease = image_controls
          .append("div")
          .attr("class", "image-control")
          .text("<");
        const increase = image_controls
          .append("div")
          .attr("class", "image-control")
          .text(">");

        let img_idx = preview_image.attr("img_idx") % this.images.length;
        //changing image
        increase.on("click", () => {
          img_idx = (preview_image.attr("img_idx") + 1) % this.images.length;
          preview_image.attr("img_idx", img_idx);
          preview_image.attr(
            "src",
            `${this.image_folder}${this.name}/${this.images[img_idx]}`
          );
        });
        decrease.on("click", () => {
          img_idx =
            (preview_image.attr("img_idx") - 1 + this.images.length) %
            this.images.length;

          preview_image.attr("img_idx", img_idx);
          preview_image.attr(
            "src",
            `${this.image_folder}${this.name}/${this.images[img_idx]}`
          );
        });
      }
    }

    if (this.description != undefined) {
      info_container
        .append("div")
        .attr("class", "description hide-scrollbar")
        .text(this.description);
    }

    // if(this.code_link != undefined){
    //     blurb.append('a')
    //         .attr("href", this.code_link)
    //         .attr('class', 'link')
    //         .text('see code')
    //         .attr("target", "_blank")
    // }
  }

  previewCard() {
    if (this.main_color != undefined) {
      d3.select(":root").style("--current-back", this.main_color);
      d3.select(":root").style("--current-front", this.front_color);
    }

    d3.select("body").style("overflow", "hidden");
    const popup_container = d3
      .select("#app")
      .append("div")
      .attr("class", "popup-container hide-scrollbar");

    //popup content
    const header = popup_container
      .append("div")
      .attr("class", "row space-between med-gap");
    this.appendBlurb(header, true);
    const images_container = header
      .append("div")
      .attr("class", "preview_images");
    let img_num = 0;
    let multiple_code_links = Array.isArray(this.code_link);
    for (const image_link of this.images) {
      let img = images_container
        .append("img")
        .attr("class", "preview-image")
        .attr("img_num", img_num)
        .attr("id", `preview-image-${this.name}-${img_num}`)
        .attr("src", `${this.image_folder}${this.name}/${image_link}`);

      if (multiple_code_links) {
        img.on("mouseover", () => img.style("border", "2px solid black"));
        img.on("mouseleave", () => img.style("border", ".1px solid black"));
        img.on("click", () => {
          console.log(
            this.code_link,
            img.attr("img_num"),
            this.code_link.length
          );
          popup_container.selectAll(".code-preview").remove();
          this.loadSketch(popup_container, this.code_link[img.attr("img_num")]);
        });
      }
      img_num = img_num + 1;
    }

    if (this.project_link) {
      // this.appendPreview(popup_container);
      // return;
      const button = popup_container
        .append("button")
        .text("Open Project")
        .on("click", () => {
          window.open(this.project_link, "_blank");
        });
      if (this.isDark) {
        button.attr("class", "dark");
      } else {
        button.attr("class", "light");
      }
    }
    if (this.code_link.includes("codeFiles")) {
      this.loadSketch(popup_container, this.code_link);
    } else if (multiple_code_links) {
      this.loadSketch(popup_container, this.code_link[0]);
    }

    // close popup
    const close_btn = popup_container
      .append("div")
      .text("x")
      .attr("class", "close-btn");
    close_btn.on("click", () => {
      d3.select(":root").style(
        "--current-back",
        d3.select(":root").style("--default-back")
      );
      d3.select(":root").style("--current-front", "black");
      d3.select("body").style("overflow", "auto");
      popup_container.remove();
    });
  }

  async loadSketch(container, codeSrc) {
    const code_container = container
      .append("div")
      .attr("class", "row code-preview");
    if (this.show_code) {
      const code_text = await this.getScriptSrc();
      console.log("GOT CODE TEXT");
      const left_panel = code_container
        .append("p")
        .text(code_text)
        .attr("class", "no-select");
      const drag_panel = code_container.append("div").attr("id", "drag-panel");
      setupDrag(drag_panel.node(), left_panel.node());
    }

    const iframe_container = code_container
      .append("div")
      .style("width", "100%")
      .style("height", "65vh")
      .attr("class", "iframe-container")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("align-items", "flex-start");

    const iframe = iframe_container
      .append("iframe")
      .attr("src", codeSrc)
      // .style('width', '100%')
      .style("width", "100%")
      .style("min-width", "500px")
      .attr("scrolling", "no")
      .style("height", "fit-content")
      .style("min-height", "500px")
      .style("flex-shrink", 0);

    resizeIframe(iframe);
  }

  async getScriptSrc() {
    try {
      const response = await fetch(this.code_script); // Await the response
      const jsCode = await response.text(); // Await the text content of the JS file
      console.log("JS CODE obtained");
      const formatted_code = jsCode.replace(/\n/g, "\n");
      // console.log(formatted_code)
      return formatted_code; // Return the code once it's ready
    } catch (error) {
      console.error("Error fetching JS code:", error);
      return ""; // Return an empty string in case of error
    }
  }
}
function setupDrag(dragPanel, leftPanel) {
  //   const dragPanel = document.getElementById("drag-panel");
  //   const leftPanel = document.querySelector(".left-panel");

  let isDragging = false;

  dragPanel.addEventListener("mousedown", (e) => {
    isDragging = true;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const newWidth = e.clientX;
    if (newWidth > 150 && newWidth < window.innerWidth - 150) {
      leftPanel.style.width = newWidth + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.cursor = "default";
  });
}

function resizeIframe(iframe) {
  // Wait for the iframe content to load
  iframe.node().addEventListener("load", function () {
    // Get the iframe's content document
    const iframeDoc =
      iframe.node().contentDocument || iframe.node().contentWindow.document;

    // Ensure that content is fully loaded
    const iframeBody = iframeDoc.body;
    console.log(iframeBody);

    // Get the container dimensions
    const container = iframe.node().parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Get content dimensions (body's width and height)
    const contentWidth = iframeBody.scrollWidth;
    let contentHeight = iframeBody.scrollHeight;
    if (contentHeight == 0) {
      contentHeight = containerHeight;
    }

    // Calculate the scaling factor based on content vs container size
    const scaleWidth = containerWidth / contentWidth;
    const scaleHeight = containerHeight / contentHeight;

    // Use the smaller scale factor to ensure content fits both width and height
    const scale = Math.min(scaleWidth, scaleHeight, 1); // Don't scale larger than the content
    console.log(scaleWidth, scaleHeight);
    if (scale == 1) {
      return;
    }
    console.log("Container dimensions:", containerWidth, containerHeight);
    console.log("Content dimensions:", contentWidth, contentHeight);
    console.log("Scaling factor:", scale);
    const scaledWidth = contentWidth * scale; // Apply scale to content width
    const scaledHeight = Math.min(contentHeight * scale, containerHeight); // Apply scale to content height
    console.log("Scaled dimensions:", scaledWidth, scaledHeight);

    // Apply scaling to the iframe
    iframe
      .style("transform", `scale(${scale})`)
      .style("width", `${contentWidth}px`) // Set the iframe width based on the content size
      .style("height", `${contentHeight}px`); // Set the iframe height based on the content size

    // Optional: Center the iframe in the container
    iframe.style("top", `${(containerHeight - contentHeight) / 2}px`);
    if (contentWidth > contentHeight && window.innerWidth < 600) {
      console.log("here", containerHeight, contentHeight);
      iframe.style("top", `${-(containerHeight - scaledHeight) / 2}px`);
    }
    // iframe.style("left", `${-(containerWidth - scaledWidth) / 2}px`);

    d3.select(container)
      .style("width", scaledWidth + "px")
      .style("height", scaledHeight + "px");
  });
}
