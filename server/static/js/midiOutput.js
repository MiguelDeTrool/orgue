// For info on how to setup virtual midi driver
// https://tldp.org/HOWTO/MIDI-HOWTO-10.html

export const MidiOutput = () => {
  let output;
  let pitches;
  let targetMidiChannel;
  let volumeCC;

  const onMIDISuccess = (midiAccess) => {
    console.log("MIDI ready!");
    console.log(midiAccess);
    output = midiAccess.outputs.get(
      "6FF5590044F4859ED50C5167BCFE9700A1798E39AA55A628E86D39011FAECD5D"
    ); // Hard coded ALSA midi output ID
    console.log(output);
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
    targetMidiChannel = formData.instrument;
    volumeCC = formData.volume;
  };

  const tick = (noteIndex, fractionalDuration) => {
    if ((fractionalDuration = 0)) {
      for (let i = 0; i <= 127; i++) {
        output.send([0x80, 60, 0]); // timestamp = now + 1000ms.
      }
      output.send([0x90, 60, pitches[noteIndex]]);
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
