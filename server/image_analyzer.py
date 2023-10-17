import numpy as np
import cv2 as cv
import os
import math

class ImageAnalyzer:
    def __init__(self, path):
        self.path = path

    def findLatestImage(self):
        valid_files = [os.path.join(self.path, filename) for filename in os.listdir(self.path)]
        latestFile = max(valid_files, key=os.path.getctime)
        return latestFile

    def getCoordinates(self, file, num):
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

    def createCoorDict(self, num):
        imgPath = self.findLatestImage()
        coordinates = self.getCoordinates(imgPath, num)
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

        dict = {'imgPath': imgPath, 'coordinates': coordinates, 'distances': distances, 'angles': angles}
        return dict