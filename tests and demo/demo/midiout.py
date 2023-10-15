import time
import rtmidi

midiout = rtmidi.MidiOut()
available_ports = midiout.get_ports()

midiout.open_port(1)

with midiout:
    midiout.send_message([0x90, 40, 111]) # channel 1, middle C, velocity 112

    time.sleep(0.4)
    midiout.send_message([0x80, 40, 0])

del midiout