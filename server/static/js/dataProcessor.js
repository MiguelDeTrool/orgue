export const DataProcessor = (subscriberArray) => {
  const _subscribers = [];
  let _rawData = {};
  let _preppedData = {};
  let sequenceLength;

  const addSubscriber = (newSubscriber) => {
    _subscribers.push(newSubscriber);
  };

  const _updateSubscribers = () => {
    _subscribers.forEach((subscriber) => {
      // All subscribers must have an update method that can handle the prepped data, like an interface
      subscriber.updateData(_preppedData);
    });
  };

  const _prepareData = () => {
    let workData = [];
    let sortedCoordinates = _rawData.coordinates
      .slice(0, sequenceLength + 1) // Keep best points, with one extra to have final point to draw last line
      .toSorted((currPoint, nextPoint) => {
        if (currPoint[0] > nextPoint[0]) {
          return 1;
        } else {
          return -1;
        }
      });

    for (let i = 0; i <= sequenceLength; i++) {
      let point = {};
      let currCoor = sortedCoordinates[i];

      point.coordinates = [];
      point.coordinates.push(currCoor[0]);
      point.coordinates.push(currCoor[1]);

      // Check if it's the last point to not add distance and pitch
      if (i != sequenceLength) {
        let nextCoor = sortedCoordinates[i + 1];

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
      }

      workData.push(point);
    }

    return workData;
  };

  const initialize = (newRawData) => {
    _rawData = newRawData;
    _preppedData = _prepareData(_rawData);
    _updateSubscribers();
  };

  const updateParameters = (formData) => {
    if (formData.length != sequenceLength) {
      reprocessOldDataAndUpdate(formData.length);
      _updateSubscribers();
    }
  };

  const reprocessOldDataAndUpdate = (length) => {
    sequenceLength = parseInt(length);
    _preppedData = _prepareData(_rawData);
    _updateSubscribers();
  };

  return {
    addSubscriber,
    initialize,
    updateParameters,
    reprocessOldDataAndUpdate,
  };
};
