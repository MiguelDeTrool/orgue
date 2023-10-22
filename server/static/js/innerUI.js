export const incAndDecNum = (numberSelector, plusSelector, minusSelector) => {
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
      number.textContent = value;
    }
  });

  minus.addEventListener("click", () => {
    if (value > minValue) {
      value--;
      number.textContent = value;
    }
  });

  return {};
};
