import os
import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt

def getLatestImagePath(path):
    valid_files = [os.path.join(path, filename) for filename in os.listdir(path)]
    latestFile = max(valid_files, key=os.path.getctime)
    return latestFile

def extractCorners(file, numPoints):
    img = cv.imread(file)
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    height, width, _ = img.shape
    minDist = (width + height) / 10
    corners = cv.goodFeaturesToTrack(image=gray, maxCorners=numPoints, qualityLevel=0.3, minDistance=minDist, blockSize=3)
    corners = np.intp(corners)

    coordinates = []
    for i in corners:
        coordinates.append(i.flatten())

    return coordinates

imgPath = getLatestImagePath("/home/pepite/orgue/server/static/images/")
coordinates = extractCorners(imgPath, 25)
img = cv.imread(imgPath)
for currPoint, nextPoint in zip(coordinates, coordinates[1:]):
    cv.circle(img, currPoint, 12, (255, 0, 0), -1)
    cv.line(img, currPoint, nextPoint, (0, 255, 0), thickness=3, lineType=8)

print(coordinates)
plt.imshow(img),plt.show()