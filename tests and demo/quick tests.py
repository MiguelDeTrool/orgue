# items = [-90, -45, 0, 45, 90, 135, 180, -135]

# # target [180, 135, 90, 45, 0, 45, 90, 135]

# for i, value in enumerate(items):
#     if (value < -90):
#         value = value + 360
#     value = value - 90
#     value = abs(value)
#     items[i] = value

# print(items)

# import os
# print(os.listdir("/home/pepite/orgue/server/static/images/"))

import time
import subprocess
currTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

subprocess.run(['touch', f'/home/pepite/Pictures/{currTime}.png'])
subprocess.run(['scanimage', '--format=png', '--resolution=600', f'--o="/home/pepite/Pictures/{currTime}.png'])