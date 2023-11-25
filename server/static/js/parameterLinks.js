export const ParameterLinks = (formSelector) => {
  const form = document.querySelector(formSelector);
  const _subscribers = [];
  form.addEventListener("input", () => {
    _updateSubscribers();
  });

  const numberInput = document.querySelector("#length");

  const addSubscriber = (newSubscriber) => {
    _subscribers.push(newSubscriber);
  };

  const initialize = (jsonData) => {
    numberInput.setAttribute("max", jsonData.coordinates.length - 1); // Hard coded note length input field
    _updateSubscribers();
  };

  const _updateSubscribers = () => {
    _subscribers.forEach((subscriber) => {
      let formData = Object.fromEntries(new FormData(form));
      subscriber.updateParameters(formData);
    });
  };

  return { initialize, addSubscriber };
};
