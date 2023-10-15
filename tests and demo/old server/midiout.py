import time
import math
import numpy as np
import rtmidi


def sendmidi(coordinates):
    midiout = rtmidi.MidiOut()
    available_ports = midiout.get_ports()
    midiout.open_port(1)

    for currPoint, nextPoint in zip(coordinates, coordinates[1:]):
        dist = math.dist(currPoint, nextPoint)
        angle = np.rad2deg(np.arctan2(nextPoint[1] - currPoint[1], nextPoint[0] - currPoint[0]))
        if (angle < -90):
            angle = angle + 360
        angle = angle - 90
        angle = abs(angle)
        timeToWait = dist / 100
        pitch = angle / 3 + 24
        midiout.send_message([0x90, pitch, 127]) # channel 1, middle C, velocity 127
        time.sleep(timeToWait / 2)
        midiout.send_message([0x80, pitch, 0])
        time.sleep(timeToWait / 2)