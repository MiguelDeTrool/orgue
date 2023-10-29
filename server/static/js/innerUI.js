export const IncAndDecNum = (numberSelector, plusSelector, minusSelector) => {
  const number = document.querySelector(numberSelector);
  const plus = document.querySelector(plusSelector);
  const minus = document.querySelector(minusSelector);
  let maxValue = 12;
  let minValue = 3;
  let value = 4;
  number.value = value;

  plus.addEventListener("click", () => {
    if (value < maxValue) {
      value++;
      number.value = value; // Using value for input fiel, change to textContent for normal elements
    }
  });

  minus.addEventListener("click", () => {
    if (value > minValue) {
      value--;
      number.value = value;
    }
  });

  return {};
};

export const LoadingModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);

  const initialize = () => {
    modal.style.display = "none";
  };

  return { initialize };
};
