from flask import Flask, render_template, request, jsonify
import time
import cv2dict
 
app = Flask(__name__)
 
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/image")
def image():
    time.sleep(2)
    imgPath = cv2dict.getLatestImagePath("/home/pepite/orgue/server/static/images/")
    coorDict = cv2dict.createCoorDict(imgPath, 28);
    print(coorDict)
    return jsonify(coorDict)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, use_reloader=False)