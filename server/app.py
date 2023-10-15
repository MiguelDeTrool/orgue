from flask import Flask, render_template, request, jsonify
import time
from cv2dict import ImageAnalyzer

workingPath = "/home/pepite/orgue/server/static/images/"

app = Flask(__name__)
iA = ImageAnalyzer(workingPath)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/image")
def image():
    time.sleep(2)
    coorDict = iA.createCoorDict(28);
    print(coorDict)
    return jsonify(coorDict)

 
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)