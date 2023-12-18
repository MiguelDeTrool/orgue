export const PageSetup = () => {
  const _subscribers = [];
  const _errorSubscribers = [];
  let canvasContainer = document.querySelector(".canvas-container");
  let url = document.URL;

  const addSubscriber = (newSubscriber) => {
    _subscribers.push(newSubscriber);
  };

  const addErrorSubscriber = (newSubscriber) => {
    _errorSubscribers.push(newSubscriber);
  };

  const _updateSubscribers = (responseJSON) => {
    _subscribers.forEach((subscriber) => {
      // All subscribers must have an initialize method that can handle the prepped data, like an interface
      subscriber.initialize(responseJSON);
    });
  };

  const _updateErrorSubscribers = (error) => {
    _errorSubscribers.forEach((errorSubscriber) => {
      // All subscribers must have a handleError method that can handle the prepped data, like an interface
      errorSubscriber.handleError(error);
    });
  };

  const getJson = () => {
    fetch(`${url}image`, {
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((responseJSON) => {
        _updateSubscribers(responseJSON);
      })
      .catch((error) => {
        _updateErrorSubscribers(error.message);
      });
  };

  return { addSubscriber, addErrorSubscriber, getJson };
};
