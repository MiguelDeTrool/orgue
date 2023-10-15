let midi = null; // global MIDIAccess object
let output;

const midiHandler = (() => {
  onMIDISuccess = (midiAccess) => {
    console.log("MIDI ready!");
    console.log(midiAccess);
    output = midiAccess.outputs.get(
      "8/0OFYgRkTY4aJ56l0KjPtHIATx1VQexezglSl4dKBc="
    ); // unique each time? May need to rewrite
  };

  onMIDIFailure = (msg) => {
    console.error(`Failed to get MIDI access - ${msg}`);
  };

  return {
    onMIDISuccess,
    onMIDIFailure,
  };
})();

// dist = math.dist(currPoint, nextPoint)
// angle = np.rad2deg(np.arctan2(nextPoint[1] - currPoint[1], nextPoint[0] - currPoint[0]))
// if (angle < -90):
//     angle = angle + 360
// angle = angle - 90
// angle = abs(angle)
// timeToWait = dist / 100
// pitch = angle / 3 + 24
// midiout.send_message([0x90, pitch, 127]) # channel 1, middle C, velocity 127
// time.sleep(timeToWait / 2)
// midiout.send_message([0x80, pitch, 0])
// time.sleep(timeToWait / 2)

const clock = (function () {
  let ms = 20;
  let clockId;
  let date = window.performance.now();
  const startClock = (callback) => {
    clockId = setInterval(() => {
      let currDate = window.performance.now();
      let interval = currDate - date;
      // console.log(interval);
      callback(interval);
      date = currDate;
    }, ms);
  };

  const stopClock = () => {
    clearInterval(clockId);
  };

  return { startClock, stopClock };
})();

let elapsedTime = 0;

let loop = (interval) => {
  elapsedTime += interval;
  // console.log(elapsedTime);
  if (elapsedTime > 2000) {
    output.send([0x90, 60, 127]); // omitting the timestamp means send immediately.
    output.send([0x80, 60, 0], window.performance.now() + 1000.0); // timestamp = now + 1000ms.
    elapsedTime = 0;
  }
};

navigator
  .requestMIDIAccess()
  .then(midiHandler.onMIDISuccess, midiHandler.onMIDIFailure);

navigator.permissions.query({ name: "midi", sysex: true }).then((result) => {
  if (result.state === "granted") {
    // Access granted.
  } else if (result.state === "prompt") {
    // Using API will prompt for permission
  }
  // Permission was denied by user prompt or permission policy
});

clock.startClock(loop);
// clock.stopClock();
