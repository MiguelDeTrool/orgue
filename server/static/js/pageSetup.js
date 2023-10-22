export const PageSetup = (dataProcessor) => {
  let canvasContainer = document.querySelector(".canvas-container");
  let url = document.URL;

  const getJson = () => {
    fetch(`${url}image`, {
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let imgPath = response.imgPath.slice(25);
        canvasContainer.style.backgroundImage = `url(${imgPath})`;
        dataProcessor.processAndUpdate(response);
      });
  };

  return { getJson };
};
