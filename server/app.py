from flask import Flask, render_template, request, abort, jsonify
from image_scanner import ImageScanner
from image_analyzer import ImageAnalyzer

workingPath = "/home/pepite/orgue/server/static/images/"

app = Flask(__name__)
iS = ImageScanner(workingPath)
iA = ImageAnalyzer(workingPath)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/image")
def image():
    returnCode = iS.scanImage()
    match returnCode:
        case 0:
            coorDict = iA.createCoorDict(28)
            return jsonify(coorDict)
        case 7:
            return "", "500 Partition non-detectée"

 
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)