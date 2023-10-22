export const Clock = (subscriberArray) => {
  const _subscribers = subscriberArray;
  let distances = [];
  let noteIndex = 0;
  let ms = 16; // It seems the possible minimum is 16
  let clockId;
  let prevDate;
  let speedFactor = 1;

  const update = (pointsData) => {
    distances = [];
    pointsData.forEach((point) => {
      distances.push(point.distance);
    });
  };

  const _updateSubscribers = (subscribers, fractionalDuration) => {
    subscribers.forEach((subscriber) => {
      // All subscribers must have a tick method that can handle the noteIndex and fractionalDuration, like an interface
      subscriber.tick(noteIndex, fractionalDuration);
    });
  };

  const calculateFractionalDuration = (interval) => {
    let fractionalDuration =
      fractionalDuration + distances[noteIndex] / (interval * speedFactor);
    if (fractionalDuration >= 1) {
      noteIndex++;
      noteIndex % distances.length;
      fractionalDuration = 0;
    }
    return fractionalDuration;
  };

  const startClock = () => {
    prevDate = Date.now();
    clockId = setInterval(() => {
      let currDate = Date.now();
      let interval = currDate - prevDate;
      let fractionalDuration = calculateFractionalDuration(interval);
      _updateSubscribers(_subscribers, fractionalDuration);
      prevDate = currDate;
    }, ms);
  };

  const stopClock = () => {
    clearInterval(clockId);
  };

  return { update, startClock, stopClock };
};
