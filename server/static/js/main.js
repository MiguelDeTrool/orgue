let canvasContainer = document.querySelector(".canvas-container");

let url = document.URL;
fetch(`${url}image`, {
  mode: "cors",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    imgPath = response.imgPath.slice(25);
    canvasContainer.style.backgroundImage = `url(${imgPath})`;
  });
