export const DataProcessor = (subscriberArray) => {
  const _subscribers = subscriberArray;
  let _preppedData = {};

  const _updateSubscribers = (subscribers) => {
    subscribers.forEach((subscriber) => {
      // All subscribers must have an update method that can handle the prepped data, like an interface
      subscriber.update(_preppedData);
    });
  };

  const _prepareData = (raw) => {
    let workData = {};
    workData.distances = raw.distances;
    workData.pitches = [];
    raw.angles.forEach((angle) => {
      workData.pitches.push(Math.round(angle / 3 + 24));
    });
    workData.coordinates = raw.coordinates;
    return workData;
  };

  const processAndUpdate = (newRawData) => {
    _preppedData = _prepareData(newRawData);
    _updateSubscribers(_subscribers);
  };

  return { processAndUpdate };
};
