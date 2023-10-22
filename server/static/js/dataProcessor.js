export const DataProcessor = (subscriberArray) => {
  const _subscribers = subscriberArray;
  let _rawData = {};
  let _preppedData = {};
  let sequenceLength = 4;

  const _updateSubscribers = (subscribers) => {
    subscribers.forEach((subscriber) => {
      // All subscribers must have an update method that can handle the prepped data, like an interface
      subscriber.update(_preppedData);
    });
  };

  const _prepareData = () => {
    let workData = [];
    let sortedCoordinates = _rawData.coordinates.toSorted(
      (currPoint, nextPoint) => {
        return currPoint[0] > nextPoint[0];
      }
    );

    for (let i = 0; i <= sequenceLength; i++) {
      let currCoor = sortedCoordinates[i];
      let nextCoor = sortedCoordinates[i + 1];
      let point = {};

      point.coordinates = [];
      point.coordinates.push(currCoor[0]);
      point.coordinates.push(currCoor[1]);

      point.distance = Math.hypot(
        currCoor[0] - nextCoor[0],
        currCoor[1] - nextCoor[1]
      );

      let angle = Math.atan2(
        nextCoor[1] - currCoor[1],
        nextCoor[0] - currCoor[0]
      );

      angle = angle * (180 / Math.PI);

      if (angle < -90) {
        angle += 360;
      }
      angle -= 90;
      angle = Math.abs(angle);

      // point.pitch = Math.round(angle / 3 + 24);
      point.pitch = angle;

      workData.push(point);
    }

    return workData;
  };

  const processNewDataAndUpdate = (newRawData) => {
    _rawData = newRawData;
    _preppedData = _prepareData(_rawData);
    _updateSubscribers(_subscribers);
  };

  const reprocessOldDataAndUpdate = (length) => {
    sequenceLength = parseInt(length);
    _preppedData = _prepareData(_rawData);
    _updateSubscribers(_subscribers);
  };

  return { processNewDataAndUpdate, reprocessOldDataAndUpdate };
};
