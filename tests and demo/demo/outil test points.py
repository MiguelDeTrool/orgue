import numpy as np
import cv2 as cv
import os
from PIL import Image
import time
import subprocess

path = "server/static/images" # Ecrire entre les guillemets l'arborescence du dossier contenant les images

def scanImage():
  currTime = time.strftime("%Y-%m-%d_%H:%M:%S", time.localtime())
  img = Image.new("RGB", (32, 32), color="white")
  imgPath = path + currTime + ".png"
  img.save(imgPath)
  subprocess.run(["scanimage", "--format=png", "--resolution=100", "--mode=24bit Color", "-x 210", "-y 210", f"--o={imgPath}"])

# scanImage()

maskImage = cv.imread("server/static/resources/mask.png")
maskImage = cv.cvtColor(maskImage, cv.COLOR_BGR2GRAY)

valid_files = [os.path.join(path, filename) for filename in os.listdir(path)]
# print(valid_files)
imgPath = max(valid_files, key=os.path.getctime)
img = cv.imread(imgPath)
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
blur = cv.blur(gray, (20, 20))
denoise = cv.fastNlMeansDenoising(gray, None, 9) # h over 10 seems to make cancel operation
height, width, _ = img.shape

# Choisir ici la distance minimum en fonction des dimensions de l'image
distanceMinimum = (width + height) / 30

# Choisir ici toutes les autres options
corners = cv.goodFeaturesToTrack(denoise, 100, 0.1, distanceMinimum, blockSize=9, mask=maskImage)
# La doc de cette fonction dans ces deux liens :
# https://docs.opencv.org/4.x/d4/d8c/tutorial_py_shi_tomasi.html
# https://docs.opencv.org/4.x/dd/d1a/group__imgproc__feature.html#ga1d6bb77486c8f92d79c8793ad995d541

corners = np.intp(corners)

coordinates = []
for i in corners:
    coordinates.append(i.flatten())

# print(coordinates)

font                   = cv.FONT_HERSHEY_SIMPLEX
bottomLeftCornerOfText = (10,500)
fontScale              = 1
fontColor              = (255,255,255)
thickness              = 1
lineType               = 2

i = 0

for currPoint, nextPoint in zip(coordinates, coordinates[1:]):
    # cv.putText(img, i, 
    # bottomLeftCornerOfText, 
    # font, 
    # fontScale,
    # fontColor,
    # thickness,
    # lineType)
    cv.circle(img, currPoint, 12, 255, -1)
    i = i + 1

cv.imshow("image", img)
cv.waitKey(0)
cv.destroyAllWindows()
exit()