import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt
import math
import time
import rtmidi
import os

midiout = rtmidi.MidiOut()
available_ports = midiout.get_ports()

midiout.open_port(1)

def getLatestImagePath(path):
    valid_files = [os.path.join(path, filename) for filename in os.listdir(path)]
    latestFile = max(valid_files, key=os.path.getctime)
    return latestFile

imgPath = getLatestImagePath("/home/pepite/orgue/server/static/images/")
img = cv.imread(imgPath)
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
height, width, _ = img.shape
minDist = (width + height) / 20
corners = cv.goodFeaturesToTrack(gray, 8, 0.1, minDist)
corners = np.intp(corners)

coordinates = []
for i in corners:
    coordinates.append(i.flatten())

for currPoint, nextPoint in zip(coordinates, coordinates[1:]):
    # cv.circle(img, currPoint, 12, 255, -1)
    cv.line(img, currPoint, nextPoint, (0, 255, 0), thickness=3, lineType=8)

plt.imshow(img),plt.show()

# for currPoint, nextPoint in zip(coordinates, coordinates[1:]):
#     dist = math.dist(currPoint, nextPoint)
#     timeToWait = dist / 100
#     # print(timeToWait)
#     angle = np.rad2deg(np.arctan2(nextPoint[1] - currPoint[1], nextPoint[0] - currPoint[0]))
#     # print(angle)
#     if (angle < -90):
#         angle = angle + 360
#     angle = angle - 90
#     angle = abs(angle)
#     timeToWait = dist / 100
#     pitch = angle / 3 + 24

#     midiout.send_message([0x90, pitch, 88]) # channel 1, middle C, velocity 127
#     time.sleep(timeToWait / 2)
#     midiout.send_message([0x80, pitch, 0])
#     time.sleep(timeToWait / 2)
