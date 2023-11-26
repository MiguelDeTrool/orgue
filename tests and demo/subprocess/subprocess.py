import time
import subprocess

path = "/home/pepite/Pictures/"
currTime = time.strftime("%Y-%m-%d_%H:%M:%S", time.localtime())
imgPath = path + currTime + ".png"

result = subprocess.run(["scanimage", "-v", "--device-name=brother5:bus2;dev2", "--format=png", "--resolution=100", "--mode=24bit Color", "-x 210", "-y 210", f"--o={imgPath}"])

print(result)