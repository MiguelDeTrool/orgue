// For info on how to setup virtual midi driver
// https://tldp.org/HOWTO/MIDI-HOWTO-10.html

export const MidiOutput = () => {
  let output;
  let pitches;

  const onMIDISuccess = (midiAccess) => {
    console.log("MIDI ready!");
    console.log(midiAccess);
    output = midiAccess.outputs.get(
      "HyxW3R3rLQzQ2FV3MnoXT3ehgBHZoB0sb1OlF/3hLq8="
    ); // Hard coded ALSA midi output ID
    output.send([0xb0, 7, 0]); // Set volume to 0 at creation on page load
  };

  const onMIDIFailure = (msg) => {
    console.error(`Failed to get MIDI access - ${msg}`);
  };

  const updateData = (pointsData) => {
    pitches = [];
    pointsData.forEach((point) => {
      pitches.push(point.pitch);
    });
  };

  const updateParameters = (formData) => {
    output.send([0xb0, 4, formData.instrument]);
    output.send([0xb0, 5, formData.harmonics]);
    output.send([0xb0, 6, formData.timbre]);
    output.send([0xb0, 7, formData.volume]);
  };

  const tick = (noteIndex, fractionalDuration) => {
    if (fractionalDuration == 0) {
      for (let i = 36; i <= 72; i++) {
        output.send([0x80, i, 0]); // timestamp = now + 1000ms.
      }
      output.send([0x90, pitches[noteIndex], 127]);
    }
  };

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

  navigator.permissions.query({ name: "midi", sysex: true }).then((result) => {
    if (result.state === "granted") {
      // Access granted.
    } else if (result.state === "prompt") {
      // Using API will prompt for permission
    }
    // Permission was denied by user prompt or permission policy
  });

  return {
    updateData,
    updateParameters,
    tick,
    onMIDISuccess,
    onMIDIFailure,
  };
};
