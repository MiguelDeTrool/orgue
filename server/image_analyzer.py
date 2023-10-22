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
        dict = {'imgPath': imgPath, 'coordinates': coordinates}
        return dict