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

export const LoadingModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);

  const initialize = () => {
    modal.style.display = "none";
  };

  return { initialize };
};
