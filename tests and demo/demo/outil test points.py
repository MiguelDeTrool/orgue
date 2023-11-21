import numpy as np
import cv2 as cv
import os
from PIL import Image
import time
import subprocess

path = "/home/pepite/Pictures/" # Ecrire entre les guillemets l'arborescence du dossier contenant les images

def scanImage(self):
  currTime = time.strftime("%Y-%m-%d_%H:%M:%S", time.localtime())
  img = Image.new("RGB", (32, 32), color="white")
  imgPath = path + currTime + ".png"
  img.save(imgPath)
  subprocess.run(["scanimage", "--format=png", "--resolution=100", "--mode=24bit Color", "-x 210", "-y 210", f"--o={imgPath}"])

scanImage()

valid_files = [os.path.join(path, filename) for filename in os.listdir(path)]
imgPath = max(valid_files, key=os.path.getctime)
img = cv.imread(imgPath)
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
height, width, _ = img.shape

# Choisir ici la distance minimum en fonction des dimensions de l'image
distanceMinimum = (width + height) / 20

# Choisir ici toutes les autres options
corners = cv.goodFeaturesToTrack(gray, 8, 0.1, distanceMinimum)
# La doc de cette fonction dans ces deux liens :
# https://docs.opencv.org/4.x/d4/d8c/tutorial_py_shi_tomasi.html
# https://docs.opencv.org/4.x/dd/d1a/group__imgproc__feature.html#ga1d6bb77486c8f92d79c8793ad995d541

corners = np.intp(corners)

coordinates = []
for i in corners:
    coordinates.append(i.flatten())

for currPoint, nextPoint in zip(coordinates, coordinates[1:]):
    cv.arrowedLine(img, currPoint, nextPoint, (0, 255, 0), thickness=3,)
    cv.circle(img, currPoint, 12, 255, -1)

cv.imshow("image", img)
cv.waitKey(0)
cv.destroyAllWindows()
exit()