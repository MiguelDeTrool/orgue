export const SliderDisplay = (sliderSelectors) => {
  const sliders = [];

  const addSlider = (sliderSelector) => {
    sliders.push(document.querySelector(sliderSelector));
  };

  sliderSelectors.forEach((sliderSelector) => {
    addSlider(sliderSelector);
  });

  sliders.forEach((slider) => {
    slider.previousSibling.textContent = slider.value;
    slider.addEventListener("input", () => {
      slider.previousSibling.textContent = slider.value;
    });
  });

  return {
    addSlider,
  };
};
