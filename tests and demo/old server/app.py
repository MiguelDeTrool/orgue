from flask import Flask, render_template, request, jsonify

from cv2lines import getLatestImagePath, extractCorners
from midiout import sendmidi

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/settings")
def settings():
  return render_template("settings.html")

@app.route('/play', methods=['POST'])
def play():
  img = getLatestImagePath("/home/pepite/orgue/server/static/images/")
  coordinates = extractCorners(img, int(request.form['num']) + 1)
  sendmidi(coordinates)
  return render_template("play.html", img=img.replace("/home/pepite/orgue/server/static/images/", ".."))

if __name__ == "__main__":
  app.run()