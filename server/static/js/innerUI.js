export const IncAndDecNum = (numberSelector, plusSelector, minusSelector) => {
  const number = document.querySelector(numberSelector);
  const plus = document.querySelector(plusSelector);
  const minus = document.querySelector(minusSelector);

  plus.addEventListener("click", () => {
    number.stepUp(1);
    var event = new Event("input", { bubbles: true });
    number.dispatchEvent(event);
  });

  minus.addEventListener("click", () => {
    number.stepDown(1);
    var event = new Event("input", { bubbles: true });
    number.dispatchEvent(event);
  });

  return {};
};

export const Loading = () => {
  const canvasContainer = document.querySelector(".canvas-container");
  const progressBar = canvasContainer.querySelector(".progress-bar");
  const reloadButtonContainer = canvasContainer.querySelector(
    ".reload-button-container"
  );
  const errorDisplay = canvasContainer.querySelector(".error-display");

  const initialize = (responseJSON) => {
    let imgPath = responseJSON.imgPath.slice(25);
    canvasContainer.style.backgroundImage = `url(${imgPath})`;
    progressBar.style.display = "none";
  };

  const handleError = (errorMessage) => {
    progressBar.style.display = "none";
    canvasContainer.style.backgroundImage = `url(
      "/static/resources/BackgroundError-72ppi.png"
    )`;
    errorDisplay.textContent = errorMessage;
    reloadButtonContainer.style.display = "flex";
  };

  return { initialize, handleError };
};
