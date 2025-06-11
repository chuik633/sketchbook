class dvSketch {
  constructor(
    name,
    project_link = undefined,
    date = undefined,
    description = undefined,
    code_link = undefined,
    images = undefined,
    process_images = [],
    main_color = undefined,
    image_folder = "./assets/sketch_images/",
    show_code = false
  ) {
    this.name = name;
    this.date = date;
    this.description = description;
    this.project_link = project_link;
    this.process_images = process_images;
    this.code_link = code_link;
    this.show_code = show_code;
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
    if (this.isDark) {
      this.front_color = "white";
    }
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
        })
        .on("click", () => {
          this.previewCard();
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
        increase.on("click", (event) => {
          event.stopPropagation();
          img_idx = (preview_image.attr("img_idx") + 1) % this.images.length;
          preview_image.attr("img_idx", img_idx);
          preview_image.attr(
            "src",
            `${this.image_folder}${this.name}/${this.images[img_idx]}`
          );
        });
        decrease.on("click", (event) => {
          event.stopPropagation();
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
      .attr("class", "row space-between med-gap popup-header");
    const left_header = header
      .append("div")
      .attr("class", "column")
      .style("gap", "15px");
    this.appendBlurb(left_header, true);

    const images_container = header
      .append("div")
      .attr("class", "preview_images");
    this.appendImages(images_container, this.images);

    const button_container = left_header
      .append("div")
      .attr("class", "row")
      .style("padding-top", "20px");
    this.makeButton("Open Project", this.project_link, button_container);
    this.makeButton("See Code", this.code_link, button_container);

    const process_images_container = popup_container
      .append("div")
      .attr("class", "process-images-container");
    this.appendImages(process_images_container, this.process_images);

    this.closeButton(popup_container);
  }

  makeButton(button_text, button_link, popup_container) {
    const button = popup_container
      .append("button")
      .text(button_text)
      .on("click", () => {
        window.open(button_link, "_blank");
      });
    if (this.isDark) {
      button.attr("class", "dark");
    } else {
      button.attr("class", "light");
    }
  }

  appendImages(container, images) {
    let img_num = 0;
    for (const image_link of images) {
      let img = container
        .append("img")
        .attr("class", "preview-image")
        .attr("img_num", img_num)
        .attr("id", `preview-image-${this.name}-${img_num}`)
        .attr("src", `${this.image_folder}${this.name}/${image_link}`);
      img_num = img_num + 1;
    }
  }

  closeButton(popup_container) {
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
}
