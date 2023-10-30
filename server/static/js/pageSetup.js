export const PageSetup = () => {
  const _subscribers = [];
  let canvasContainer = document.querySelector(".canvas-container");
  let url = document.URL;

  const addSubscriber = (newSubscriber) => {
    _subscribers.push(newSubscriber);
  };

  const _updateSubscribers = (responseJSON) => {
    _subscribers.forEach((subscriber) => {
      // All subscribers must have an update method that can handle the prepped data, like an interface
      subscriber.initialize(responseJSON);
    });
  };

  const getJson = () => {
    fetch(`${url}image`, {
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        let imgPath = responseJSON.imgPath.slice(25);
        canvasContainer.style.backgroundImage = `url(${imgPath})`;
        _updateSubscribers(responseJSON);
      });
  };

  return { addSubscriber, getJson };
};
