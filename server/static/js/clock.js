export const Clock = () => {
  const _subscribers = [];
  let distances = [];
  let noteIndex = 0;
  let ms = 16; // It seems the possible minimum is 16
  let clockId;
  let prevDate;
  let fractionalDuration = 0;
  let speedFactor;

  const initialize = (x) => {
    startClock();
  };

  const updateData = (pointsData) => {
    distances = [];
    pointsData.forEach((point) => {
      distances.push(point.distance);
    });
    noteIndex = 0;
    fractionalDuration = 0;
  };

  const updateParameters = (formData) => {
    speedFactor = formData.speed / 100;
  };

  const addSubscriber = (newSubscriber) => {
    _subscribers.push(newSubscriber);
  };

  const _updateSubscribers = (fractionalDuration) => {
    _subscribers.forEach((subscriber) => {
      // All subscribers must have a tick method that can handle the noteIndex and fractionalDuration, like an interface
      subscriber.tick(noteIndex, fractionalDuration);
    });
  };

  const calculateFractionalDuration = (interval) => {
    fractionalDuration =
      fractionalDuration + (interval * speedFactor) / distances[noteIndex];
    if (fractionalDuration >= 1) {
      noteIndex++;
      if (noteIndex >= distances.length - 1) {
        noteIndex = 0;
      }
      fractionalDuration = 0;
    }
    return fractionalDuration;
  };

  const startClock = () => {
    prevDate = window.performance.now();
    clockId = setInterval(() => {
      let currDate = window.performance.now();
      let interval = currDate - prevDate;
      _updateSubscribers(fractionalDuration);
      calculateFractionalDuration(interval);
      prevDate = currDate;
    }, ms);
  };

  const stopClock = () => {
    clearInterval(clockId);
  };

  return {
    initialize,
    updateData,
    updateParameters,
    addSubscriber,
    startClock,
    stopClock,
  };
};
