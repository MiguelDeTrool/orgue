from PIL import Image
import time
import subprocess

class ImageScanner:
  def __init__(self, path):
    self.path = path
  
  def scanImage(self):
    currTime = time.strftime("%Y-%m-%d_%H:%M:%S", time.localtime())
    img = Image.new("RGB", (32, 32), color="white")
    imgPath = self.path + currTime + ".png"
    img.save(imgPath)
    completedProcess = subprocess.run(["scanimage", "-v", "--device-name=brother5:bus2;dev2", "--format=png", "--resolution=100", "--mode=24bit Color", "-x 210", "-y 210", f"--o={imgPath}"])
    return completedProcess.returncode

# workingPath = "/home/pepite/Pictures/"
# iS = ImageScanner(workingPath)
# iS.scanImage()