import os
import numpy as np
import cv2 as cv
import math

def getLatestImagePath(path):
    valid_files = [os.path.join(path, filename) for filename in os.listdir(path)]
    latestFile = max(valid_files, key=os.path.getctime)
    return latestFile

def getCoordinates(file, num):
    img = cv.imread(file)
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    height, width, _ = img.shape
    minDist = (width + height) / 10
    features = cv.goodFeaturesToTrack(gray, num, 0.1, minDist)
    features = np.intp(features)

    coordinates = []
    for i in features:
        coordinates.append(i.flatten().tolist())

    return coordinates

def createCoorDict(file, num):
    coordinates = getCoordinates(file, num)
    distances = [];
    angles = [];

    for currPoint, nextPoint in zip(coordinates, coordinates[1:]):
        currDistance = math.dist(currPoint, nextPoint)

        currAngle = np.rad2deg(np.arctan2(nextPoint[1] - currPoint[1], nextPoint[0] - currPoint[0]))
        if (currAngle < -90):
            currAngle += 360
        currAngle -= 90
        currAngle = abs(currAngle)

        distances.append(currDistance) 
        angles.append(currAngle)

    dict = {'coordinates': coordinates, 'distances': distances, 'angles': angles}
    return dict
