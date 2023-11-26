#! /bin/bash
nohup python3 /home/pepite/orgue/server/app.py &
sleep 2
plugdata /home/pepite/orgue/sound/plaits.pd &
sleep 2
firefox -kiosk 127.0.0.1:5000
