export const Clock = (subscriberArray) => {
  const _subscribers = subscriberArray;
  let distances = [];
  let noteIndex = 0;
  let ms = 16; // It seems the possible minimum is 16
  let clockId;
  let prevDate;
  let fractionalDuration = 0;
  let speedFactor = 0.25;

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
      calculateFractionalDuration(interval);
      _updateSubscribers(_subscribers, fractionalDuration);
      prevDate = currDate;
    }, ms);
  };

  const stopClock = () => {
    clearInterval(clockId);
  };

  return { update, startClock, stopClock };
};
