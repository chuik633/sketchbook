function layout_physical_art_page(container) {
  const page = container.append("div").attr("class", "page physical-art-page");
  page.append("h2").text("PHYSICAL ART");

  const grid = page.append("div").attr("class", "masonry-grid");
  art_data.forEach(({ name }) => {
    grid
      .append("img")
      .attr("src", `./assets/physicalArt/${name}`)
      .attr("alt", name);
  });

  page
    .append("button")
    .text("See More")
    .on("click", () => {
      window.open("kchuiart.com", "_blank");
    });

  return page;
}
