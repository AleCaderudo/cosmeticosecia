const listItems = document.querySelectorAll(".botões__item"); // Select all list items

listItems.forEach(listItem => {
  const anchor = listItem.querySelector(".botões__ancora"); // Get the anchor element
  const defaultImage = "img/Favoritos.svg"; // Default image source (assuming this is the initial state)
  const hoverImage = "img/FavoritosA.svg"; // Replace with your hover image path
  const clickImage = "img/FavoritosB.svg"; // Replace with your click image path

  let currentImage = defaultImage; // Initialize current image to default
  let currentTitle = "Favoritar"; // Initialize current title based on default image

  // Set initial image and title
  anchor.querySelector("img").src = currentImage;
  listItem.title = currentTitle;

  anchor.addEventListener("mouseover", () => {
    if (currentImage !== clickImage) { // Only change if not already on click image
      anchor.querySelector("img").src = hoverImage;
      currentImage = hoverImage;
    }
  });

  anchor.addEventListener("click", () => {
    if (currentImage === defaultImage) {
      anchor.querySelector("img").src = clickImage;
      currentImage = clickImage;
      currentTitle = "Desmarcar"; // Update title on click to FavoritosB.svg
    } else if (currentImage === hoverImage) {
      anchor.querySelector("img").src = clickImage;
      currentImage = clickImage;
      currentTitle = "Desmarcar"; // Update title on click to FavoritosA.svg
    } else { // Change back to default if on click image (FavoritosB.svg)
      anchor.querySelector("img").src = defaultImage;
      currentImage = defaultImage;
      currentTitle = "Favoritar"; // Update title back to default
    }
    listItem.title = currentTitle; // Update title after image change
  });

  anchor.addEventListener("mouseout", () => { // Reset on mouseout
    if (currentImage !== clickImage) {
      anchor.querySelector("img").src = defaultImage;
      currentImage = defaultImage;
    }
  });
});
