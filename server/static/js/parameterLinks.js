export const ParameterLinks = (formSelector) => {
  const form = document.querySelector(formSelector);
  const _subscribers = [];
  form.addEventListener("input", () => {
    _updateSubscribers();
  });

  const addSubscriber = (newSubscriber) => {
    _subscribers.push(newSubscriber);
  };

  const initialize = (x) => {
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
