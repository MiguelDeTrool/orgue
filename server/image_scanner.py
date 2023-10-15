from PIL import Image
import time
import subprocess

class ImageScanner:
  def __init__(self, path):
    self.path = path
  
  def scanImage(self):
    currTime = time.strftime("%Y-%m-%d_%H:%M:%S", time.localtime())
    img = Image.new("RGB", (32, 32), color="white")
    img.save(self.path + currTime + ".png")
<<<<<<< HEAD
=======
    time.sleep(1)
>>>>>>> e6f55e3224f39456a100ba5c798a8dcf7e2e5e12
    # subprocess.run(["scanimage", "--format=png", "--resolution=300", "-x 210", "-y 210", f"--o={self.path}{currTime}.png"])
    subprocess.run(["scanimage", "--format=png", "--resolution=300", "--mode=24bit Color", "--AutoDocumentSize=yes", f"--o={self.path}{currTime}.png"])